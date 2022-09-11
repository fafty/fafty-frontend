import { Header, Footer, Meta } from '@fafty-frontend/shared/ui';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../auth';

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
    auth.wallet?.logIn();
  }, [auth.wallet]);

  console.log(auth.principal?.toString());

  return (
    <>
      <Meta title={title} description={description} />
      <Header onAuth={onAuth} />
      <main className="relative container mx-auto px-8">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
