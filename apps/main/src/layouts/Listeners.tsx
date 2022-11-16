import { ReactElement, useEffect } from 'react'
import { useAuth } from '../utils/auth'

type Props = {
  children: ReactElement | null
}

export const Listeners = ({ children }: Props) => {
  const auth = useAuth()

  useEffect(() => {
    if (!auth.principal && auth.wallet) {
      auth.wallet?.logIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.wallet])

  return children
}
