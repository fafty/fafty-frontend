import { ReactElement, useEffect } from 'react';
import { useAuth } from '../utils/auth';

type Props = {
  children: ReactElement | null;
};

export const Listeners = ({ children }: Props) => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.principal && auth.wallet) {
      auth.wallet?.logIn();
    }
  }, [auth.principal, auth.wallet]);

  return children;
};
