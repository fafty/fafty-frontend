import { Header, Footer, Meta } from '@fafty-frontend/shared/ui';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../utils/auth';
import { AuthModal } from '../components/modals/AuthModal';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const MainLayout = ({ children, title, description }: Props) => {
  const [openedModal, setOpenedModal] = useState(false);
  const auth = useAuth();

  const onAuth = () => {
    setOpenedModal(true);
  };

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
      {openedModal && (
        <AuthModal
          onClose={() => setOpenedModal(false)}
          isOpened={openedModal}
        />
      )}
    </>
  );
};

export default MainLayout;
