import { Header, Footer, Meta } from '@fafty-frontend/shared/ui';
import { ReactNode, useEffect, useMemo } from 'react';
import { useAuth } from '../utils/auth';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const MainLayout = ({ children, title, description }: Props) => {
  const auth = useAuth();

  const onAuth = (key: string) => {
    if (key === 'ic') {
      auth.useInternetIdentity();
    }
  };

  useEffect(() => {
    if (!auth.principal && auth.wallet) {
      auth.wallet?.logIn();
    }
  }, [auth.wallet]);

  const balance = useMemo(() => {
    return Number(auth.balance) / Math.pow(10, 8) || 0;
  }, [auth.balance]);

  return (
    <>
      <Meta title={title} description={description} />
      <Header
        onLogOut={() => auth.wallet?.logOut?.()}
        onAuth={onAuth}
        balance={balance}
        isAuth={!!auth.principal?.toString()}
      />
      <main className="relative container mx-auto px-8">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
