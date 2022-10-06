import { Modal } from '@fafty-frontend/modals';
import FormAsset from '../../forms/asset/main';
import { FormAssetContextProvider } from '../../forms/asset/provider';
import { useState } from 'react';
import api from 'apps/fafty/src/api';
import {
  CommentsModerationType,
  CommentsOrderType,
  FormProps,
} from '../../forms/asset/types';

type Props = {
  onClose: () => void;
  isOpened: boolean;
};

const FormAssetModal = ({ isOpened, onClose }: Props) => {
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

  const onSubmit = async (data: FormProps) => {
    if (submiting) {
      return;
    }
    setSubmiting(true);
    try {
      await api.post('/nft', { nft: data });
    } catch (err) {
      throw err;
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <Modal
      // TODO: add dynamic title and description as Create or Edit
      title="Create Your Asset"
      open={isOpened}
      onDismiss={onClose}
      options={{ dismissible: true }}
      className="w-[calc(95vw_-_5px)]"
    >
      <div className="flex flex-row w-full h-full p-2">
        <FormAssetContextProvider>
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
