import { Header, Footer, Meta } from '@fafty-frontend/shared/ui';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../utils/auth';
import { AuthModal } from '../components/modals/auth';
import { CreateNftModal } from '../components/modals/create/nft';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const MainLayout = ({ children, title, description }: Props) => {
  const [openedAuthModal, setOpenedAuthModal] = useState(false);
  const [openedCreateNftModal, setOpenedCreateNftModal] = useState(false);
  const [openedCreateCollectionModal, setOpenedCreateCollectionModal] = useState(false);
  const [openedCreateBundleModal, setOpenedCreateBundleModal] = useState(false);

  const auth = useAuth();

  const onAuth = () => {
    setOpenedAuthModal(true);
  };

  const onCreate = (key: string) => {
    switch (key) {
      case 'nft':
        setOpenedCreateNftModal(true);
        break;
      case 'collection':
        setOpenedCreateCollectionModal(true);
        break;
      case 'bundle':
        setOpenedCreateBundleModal(true);
        break;
      default:
        break;
    }

        
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
        onCreate={onCreate}
        balance={balance}
        isAuth={!!auth.principal?.toString()}
      />
      <main className="relative container mx-auto px-8">{children}</main>
      <Footer />
      {openedAuthModal && (
        <AuthModal
          onClose={() => setOpenedAuthModal(false)}
          isOpened={openedAuthModal}
        />
      )}
      {openedCreateNftModal && (
        <CreateNftModal
          onClose={() => setOpenedCreateNftModal(false)}
          isOpened={openedCreateNftModal}
        />
      )}
    </>
  );
};

export default MainLayout;
