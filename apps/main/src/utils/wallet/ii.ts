import { Actor, HttpAgent, Identity } from '@dfinity/agent'
import { auth } from '../auth'
import { getHost } from '../canister/actor'
import { AuthClient } from '@dfinity/auth-client'
import { WalletInterface } from './plug'

import ledger_idl from '../canister/ledger.did.js'
import _SERVICE, { AccountBalanceArgs, SendArgs } from '../canister/ledger_type'
import { getCanisterIds } from '../canister/principals'
import { getAccountId } from '../account'

const IDENTITY_URL = 'https://identity.ic0.app'

export default function internetIdentity(): WalletInterface {
  let authClient: AuthClient | null = null
  let identity: Identity | null = null

  async function getActor<Type>(
    canisterId: string,
    idl: any
  ): Promise<Type | undefined> {
    const agent = auth.icpState.agent

    const actor = Actor.createActor<Type>(idl, {
      agent,
      canisterId: canisterId
    })

    return actor
  }

  async function logIn() {
    if (authClient == null) authClient = await AuthClient.create()

    if (authClient != null) {
      const host = getHost()

      authClient.login({
        identityProvider: IDENTITY_URL,
        onSuccess: () => {
          const client = authClient as AuthClient
          identity = client.getIdentity()

          const agent = new HttpAgent({ host, identity })

          auth.setIcpState((prev) => ({
            ...prev,
            agent,
            principal: identity.getPrincipal()
          }))

          setTimeout(() => {
            getBalance()
          }, 100)

          console.log('Logged in with II')
        },
        onError: (str) => {
          console.log('Error while logging with II: ' + str)
        }
      })
    }
  }

  function logOut() {
    authClient?.logout()

    auth.setIcpState((prev) => ({
      ...prev,
      agent: undefined,
      principal: undefined
    }))
  }

  async function requestTransfer(data: any): Promise<any> {
    if (identity !== null) {
      const principals = getCanisterIds()
      const ledgerActor = await getActor<_SERVICE>(
        principals.ledger,
        ledger_idl
      )

      const sendArgs: SendArgs = {
        to: data.to,
        fee: { e8s: BigInt(10000).valueOf() },
        memo: BigInt(0).valueOf(),
        from_subaccount: [],
        created_at_time: [],
        amount: { e8s: data.amount }
      }

      try {
        const height = await ledgerActor?.send_dfx(sendArgs)

        return true
      } catch (e) {
        console.error(e)

        return false
      }
    }

    return false
  }

  async function getBalance(): Promise<bigint | number> {
    if (identity !== null) {
      const principals = getCanisterIds()
      const ledgerActor = await getActor<_SERVICE>(
        principals.ledger,
        ledger_idl
      )

      const accountId = getAccountId(identity.getPrincipal().toString(), 0)

      const req: AccountBalanceArgs = {
        account: accountId
      }

      const raw_balance = await ledgerActor?.account_balance_dfx(req)

      if (raw_balance !== undefined) {
        return raw_balance.e8s
      }
    }
  }

  return {
    name: 'ii',
    logIn,
    logOut,
    getActor,
    requestTransfer,
    getBalance
  }
}
