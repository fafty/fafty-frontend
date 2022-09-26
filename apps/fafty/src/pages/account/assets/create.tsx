import AccountLayout from '../../../layouts/account';
import {
  useState,
} from 'react';
import NftForm from "../../../components/forms/nft";
import api from '../../../api';

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
export default function Create() {
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
    <AccountLayout title={'Create Nft'} description={'Create Nft description'}>
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-4">
        <NftForm data={defaultData} onSubmit={onSubmit} submiting={submiting} />
      </div>
    </AccountLayout>
  );
}
