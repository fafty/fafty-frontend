import { Modal } from '@fafty-frontend/modals';
import { useAuth } from '../../../utils/auth';
import NftForm from '../../forms/nft';
import { useState } from 'react';
import api from 'apps/fafty/src/api';

type Props = {
  onClose: () => void;
  isOpened: boolean;
};

export const CreateNftModal = ({ isOpened, onClose }: Props) => {

  const defaultData = {
    asset: null,
    name: '',
    description: '',
    unlockable_content: '',
    supply_units: 1,
    blockchain: 'near',
    collection_token: 'none',
    sensitive_content: false
  }

  const [submiting, setSubmiting] = useState(false);
  
  const onSubmit = (data: any) => {
    if (submiting) {
      return;
    }
    setSubmiting(true);
    api.post('/nft', {nft: data})
      .then((res) => {
        console.log('create page onSubmit res', res);
        setSubmiting(false);
      })
      .catch((err) => {
        console.log('create page onSubmit err', err);
        setSubmiting(false);
      });
  }

  return (
    <Modal
      title="Create Your Nft"
      open={isOpened}
      onDismiss={onClose}
      options={{ dismissible: true }}
      className="w-[calc(95vw_-_5px)]"
    >
      <div className="flex flex-row w-full h-full p-2">
        <NftForm data={defaultData} onSubmit={onSubmit} submiting={submiting} />
      </div>
    </Modal>
  );
};
