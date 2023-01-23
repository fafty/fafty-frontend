import { ReactNode, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector } from '../utils/wallet/ethereum'

type Props = {
  children: ReactNode | null
}

export const Listeners = ({ children }: Props): JSX.Element => {
  const { active, error, activate, account } = useWeb3React()

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          activate(injectedConnector)
        } else if (window.ethereum) {
          activate(injectedConnector, undefined, true).catch(() => {
            setConnected(true)
          })
        }
      })
      .finally(() => {
        setConnected(true)
      })
  }, [activate])

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = () => {
        // eat errors
        activate(injectedConnector, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injectedConnector, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, activate])

  if (connected) {
    return <>{children}</>
  }

  return null
}
