import { Header, Footer, Meta } from '@fafty/shared/ui'
import { ReactNode, useMemo, useState } from 'react'
import { useAuth } from '../utils/auth'
import { AuthModal } from '../components/modals/auth'
import FormAssetModal from '../components/modals/forms/asset'
import FormCollectionModal from '../components/modals/forms/collection'

import { getAccountId } from '../utils/account'
import classNames from 'classnames'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  title: string
  description: string
  className?: string
}

const MainLayout = ({ children, title, description, className }: Props) => {
  const [openedAuthModal, setOpenedAuthModal] = useState(false)
  const [openedFormAssetModal, setOpenedFormAssetModal] = useState(false)
  const [openedFormCollectionModal, setOpenedFormCollectionModal] =
    useState(false)
  // const [openedFormBundleModal, setOpenedFormBundleModal] = useState(false);
  const auth = useAuth()

  const onAuth = () => {
    setOpenedAuthModal(true)
  }

  const onForm = (key: string) => {
    switch (key) {
      case 'asset':
        setOpenedFormAssetModal(true)
        break
      case 'collection':
        setOpenedFormCollectionModal(true)
        break
      // case 'bundle':
      //   setOpenedFormBundleModal(true);
      //   break;
      default:
        break
    }
  }

  const balance = useMemo(() => {
    return 0
  }, [])

  return (
    <>
      <Meta title={title} description={description} />
      <Header
        address={auth.accountAddress}
        onLogOut={auth.onLogout}
        isAuth={!!auth.accountAddress}
        onAuth={onAuth}
        onCreate={onForm}
        balance={balance}
        currency={auth.currency}
      />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={{
          hidden: {
            opacity: 0,
            transition: {
              duration: 0.2
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.2,
              delay: 0.1
            }
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.2
            }
          }
        }}
        transition={{ type: 'linear' }}
        className={classNames(className, 'relative mx-auto px-8')}
      >
        {children}
      </motion.main>
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
  )
}

export default MainLayout
