import { Header, Footer, Meta } from '@fafty-frontend/shared/ui';
import { ReactNode, useMemo, useState } from 'react';
import { useAuth } from '../utils/auth';
import { AuthModal } from '../components/modals/auth';
import FormAssetModal from '../components/modals/forms/asset';
import FormCollectionModal from '../components/modals/forms/collection';

import { getAccountId } from '../utils/account';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
};

const MainLayout = ({ children, title, description, className }: Props) => {
  const [openedAuthModal, setOpenedAuthModal] = useState(false);
  const [openedFormAssetModal, setOpenedFormAssetModal] = useState(false);
  const [openedFormCollectionModal, setOpenedFormCollectionModal] = useState(false);
  const [openedFormBundleModal, setOpenedFormBundleModal] = useState(false);
  const auth = useAuth();

  const onAuth = () => {
    setOpenedAuthModal(true);
  };

  const onForm = (key: string) => {
    switch (key) {
      case 'asset':
        setOpenedFormAssetModal(true);
        break;
      case 'collection':
        setOpenedFormCollectionModal(true);
        break;
      case 'bundle':
        setOpenedFormBundleModal(true);
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
        address={auth.principal && getAccountId(auth.principal?.toString(), 0)}
        onLogOut={() => auth.wallet?.logOut?.()}
        onAuth={onAuth}
        onCreate={onForm}
        balance={balance}
        isAuth={!!auth.principal?.toString()}
      />
      <main
        className={classNames(className, 'relative mx-auto px-8')}
      >
        {children}
      </main>
      <Footer />
      {openedAuthModal && (
        <AuthModal
          onClose={() => setOpenedAuthModal(false)}
          isOpened={openedAuthModal}
        />
      )}
      {openedFormAssetModal && (
        <FormAssetModal
          title="Create Your Asset"
          onClose={() => setOpenedFormAssetModal(false)}
          isOpened={openedFormAssetModal}
        />
      )}
      {openedFormCollectionModal && (
        <FormCollectionModal
          title="Create Your Collection"
          onClose={() => setOpenedFormCollectionModal(false)}
          isOpened={openedFormCollectionModal}
        />
      )}
    </>
  );
};

export default MainLayout;
