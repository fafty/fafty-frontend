import { ReactNode, useEffect } from 'react'
import { useAuth } from '../utils/auth'

type Props = {
  children: ReactNode | null
}

export const Listeners = ({ children }: Props): JSX.Element => {
  const auth = useAuth()

  useEffect(() => {
    if (!auth.principal && auth.wallet) {
      auth.wallet?.logIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.wallet])

  return <>{children}</>
}
