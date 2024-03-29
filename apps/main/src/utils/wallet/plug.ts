import { HttpAgent } from '@dfinity/agent'
import { auth } from '../auth'
import { getHost } from '../canister/actor'

export interface PlugWindow extends Window {
  ic: any
}

declare let window: PlugWindow

export interface WalletInterface {
  name: string

  logIn: () => void
  logOut: () => void

  requestTransfer: (data: any) => any

  getActor: <Type>(canisterId: string, idl: any) => Promise<Type | undefined>

  getBalance: () => any
}

export default function plugWallet(): WalletInterface {
  let agent: HttpAgent | undefined = undefined

  async function getActor<Type>(
    canisterId: string,
    idl: any
  ): Promise<Type | undefined> {
    const actor = await window.ic.plug.createActor({
      canisterId,
      interfaceFactory: idl
    })

    return actor as Type
  }

  async function logIn() {
    if (window.ic === undefined) {
      window.open('https://plugwallet.ooo/', '_blank')?.focus()

      return
    }

    const connected = await window.ic.plug.isConnected()
    const host = getHost()

    if (!connected) {
      const result = await window.ic.plug.requestConnect()

      if (!result) {
        console.log('Could not login to plug')
        return
      }
    }

    await window.ic.plug.createAgent({ host })
    agent = window.ic.plug.agent as HttpAgent
    agent.fetchRootKey()

    const principal = await agent.getPrincipal()

    auth.setIcpState((prev) => ({ ...prev, agent, principal }))
  }

  function logOut() {
    auth.setIcpState((prev) => ({
      ...prev,
      agent: undefined,
      principal: undefined
    }))
  }

  async function requestTransfer(data: any): Promise<any> {
    if (window.ic === undefined) return

    return await window.ic.plug.requestTransfer(data)
  }

  async function getBalance(): Promise<any> {
    console.log('getBalance')
  }

  return {
    name: 'plug',
    logIn,
    logOut,
    getActor,
    requestTransfer,
    getBalance
  }
}
