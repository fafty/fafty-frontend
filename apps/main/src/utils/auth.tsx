import { createContext, ReactNode, useContext, useState } from 'react'
import { HttpAgent } from '@dfinity/agent'

import internetIdentity from './wallet/ii'

import plugWallet, { WalletInterface } from './wallet/plug'
import { Principal } from '@dfinity/principal'

export interface AuthContext {
  isShow: boolean
  showModal: (show: boolean) => void

  wallet?: WalletInterface
  principal?: Principal
  agent?: HttpAgent

  balance: bigint | null

  usePlug: () => void
  useInternetIdentity: () => void

  setPrincipal: (principal: Principal | undefined) => void
  setAgent: (agent: HttpAgent | undefined) => void

  setBalance: (data: bigint | null) => void
}

// Provider hook that creates auth object and handles state
export function useProvideAuth(): AuthContext {
  const [wallet, setWallet] = useState<WalletInterface | undefined>()

  const [principal, setPrincipal] = useState<Principal | undefined>(undefined)
  const [agent, setAgent] = useState<HttpAgent | undefined>(undefined)

  const [display, setDisplay] = useState(false)

  const [balance, setBalance] = useState<bigint | null>(null)

  const usePlug = function () {
    const wlt = plugWallet()
    setWallet(wlt)
    setDisplay(false)
  }

  const useInternetIdentity = function () {
    const wlt = internetIdentity()
    setWallet(wlt)
    setDisplay(false)
  }

  //Displays modal to select wallet
  const showModal = function (show: boolean) {
    setDisplay(show)
  }

  function get() {
    return {
      showModal,
      isShow: display,
      setPrincipal,
      principal: principal,
      setAgent,
      agent: agent,
      setBalance,
      balance,
      wallet,
      usePlug,
      useInternetIdentity
    }
  }

  return get()
}

const authContext = createContext<AuthContext>(null!)
export let auth: AuthContext

export function ProvideAuth({ children }: { children: ReactNode }) {
  auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}
