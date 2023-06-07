import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { HttpAgent } from '@dfinity/agent'

import internetIdentity from './wallet/ii'

import plugWallet, { WalletInterface } from './wallet/plug'
import { Principal } from '@dfinity/principal'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { injectedConnector } from './wallet/ethereum'
import { getAccountId } from './account'

export type AuthTypes = 'ii' | 'plug' | 'metamask'
type Networks = 'eth' | 'icp'

type ICPState = {
  agent: HttpAgent
  wallet: WalletInterface
  principal: Principal
}

export interface AuthContext {
  isShow: boolean
  showModal: (show: boolean) => void
  currency: string

  icpState: ICPState
  setIcpState: Dispatch<SetStateAction<ICPState>>

  accountAddress: string

  network: string

  useAuthByType: (type: AuthTypes) => void
  onLogout: () => void
}

// Provider hook that creates auth object and handles state
export function useProvideAuth(): AuthContext {
  const { activate, account, deactivate, active } = useWeb3React()

  const [icpState, setIcpState] = useState<ICPState>({
    agent: undefined,
    wallet: undefined,
    principal: undefined
  })

  const [network, setNetwork] = useState<Networks>()

  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (account && !icpState.wallet) {
      setNetwork(active ? 'eth' : undefined)
    }
  }, [active, account])

  useEffect(() => {
    if (!icpState.principal && icpState.wallet && network !== 'eth') {
      icpState.wallet?.logIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icpState.wallet])

  const tryActivation = async (connector: AbstractConnector) => {
    try {
      connector && (await activate(connector, undefined, true))
    } catch (e) {
      if (e instanceof UnsupportedChainIdError) {
        //
      } else {
        console.log(e)
      }
    }
  }

  const useAuthByType = (type: AuthTypes) => {
    if (type === 'ii' || type === 'plug') {
      const wlt = type === 'plug' ? plugWallet() : internetIdentity()
      setIcpState((prev) => ({ ...prev, wallet: wlt }))

      setDisplay(false)

      setNetwork('icp')
    } else if (type === 'metamask') {
      tryActivation(injectedConnector)

      setDisplay(false)

      setNetwork('eth')
    }
  }

  //Displays modal to select wallet
  const showModal = function (show: boolean) {
    setDisplay(show)
  }

  const accountAddress = useMemo(() => {
    switch (network) {
      case 'eth':
        return account
      case 'icp':
        return (
          icpState.principal && getAccountId(icpState.principal?.toString(), 0)
        )
      default:
        return ''
    }
  }, [account, icpState.principal, network])

  const currency = useMemo(() => {
    switch (network) {
      case 'eth':
        return 'ETH'
      case 'icp':
        return 'icp'
      default:
        return ''
    }
  }, [network])

  const onLogout = () => {
    switch (network) {
      case 'eth':
        return deactivate()
      case 'icp':
        return icpState.wallet?.logOut()
      default:
        return ''
    }
  }

  return {
    currency,
    network,
    showModal,
    icpState,
    isShow: display,
    setIcpState,
    useAuthByType,
    accountAddress,
    onLogout
  }
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
