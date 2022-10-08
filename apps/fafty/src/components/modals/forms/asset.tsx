import { Modal } from '@fafty-frontend/modals';
import FormAsset from '../../forms/asset/main';
import { FormAssetContextProvider } from '../../forms/asset/provider';
import { useState } from 'react';
import { api } from '@fafty-frontend/shared/api';
import { useNotifications } from '@fafty-frontend/notifications';

import {
  CommentsModerationType,
  CommentsOrderType,
  FormProps,
} from '../../forms/asset/types';

type Props = {
  title: string;
  onClose: () => void;
  isOpened: boolean;
};

const FormAssetModal = ({ title, isOpened, onClose }: Props) => {
  const defaultData = {
    asset: {
      id: '',
      storage: '',
      metadata: {
        size: 0,
        filename: '',
        mime_type: '',
      },
    },
    name: '',
    description: null,
    unlockable_content: null,
    supply_units: 1,
    blockchain: 'near',
    collection_token: '',
    sensitive_content: false,
    allow_ratings: true,
    comments_moderation: 'allow_all' as CommentsModerationType,
    comments_order: 'newest' as CommentsOrderType,
    tags: null,
  };

  const [submiting, setSubmiting] = useState(false);
  const [dismissibleData, setDismissibleData] = useState({
    title: 'Close',
    disabled: false
  });
  const [finished, setFinished] = useState(false);
  const [drafted, setDrafted] = useState(false);
  const { enqueueNotification } = useNotifications();

  const onSubmit = async (data: FormProps) => {
    if (submiting) {
      return;
    }
    if (drafted && !data.asset) {
      setDrafted(false);
      onClose();
      return;
    }
    setSubmiting(true);
    try {
      await api.post('/nft', { nft: data });
    // eslint-disable-next-line no-useless-catch
    } catch (err) {
      throw err;
    } finally {
      setSubmiting(false);
      if (drafted) {
        setDrafted(false);
        onClose();
        enqueueNotification({
          title: `Asset "${data.name}" saved as draft.`,
          position: 'bottom-center',
          message: `You can continue to edit it at any time.`,
          options: { dismissible: true },
          
        });
      }
    }
  };

  const onChangeDismiss = (data: { title: string; disabled: boolean }) => {
    setDismissibleData(data);
  };

  const dismiss =  () => {
    if (isOpened && !finished) {
      console.log('dismiss');
      setDrafted(true);
    } else {
      onClose();
    }
  }

  return (
    <Modal
      title={title}
      open={isOpened}
      onDismiss={dismiss}
      options={{ dismissible: { active: true, title: dismissibleData.title, disabled: dismissibleData.disabled } }}
      className="w-[calc(95vw_-_5px)]"
    >
      <div className="flex flex-row w-full h-full p-2">
        <FormAssetContextProvider
          onChangeDismiss={onChangeDismiss}
          rawDataCallback={drafted}
          onRawDataCallback={(data) => onSubmit(data)}
          onFinished={() => setFinished(true) }
        >
          <FormAsset
            baseData={defaultData}
            onSubmit={onSubmit}
            submiting={submiting}
          />
        </FormAssetContextProvider>
      </div>
    </Modal>
  );
};

export default FormAssetModal;
