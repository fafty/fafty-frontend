import MainLayout  from '../layouts/main'
import Hero from '../components/home/hero'
import Items from '../components/items'

import ItemProps from '../types/item'
import { useEffect, useState } from 'react';
import { api } from '@fafty-frontend/shared/api';

type ResponceProps = {
  records: ItemProps[];
};
export default function Home(): JSX.Element {
  

  const [items, setItems] = useState<ItemProps[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const response = await api.get<ResponceProps>(`nfts`);
      if (response.status === 200 && response.data) {
        const { data } = response;

        setItems(data.records);
        // setLoading(false);
      } else {
        // setLoading(false);
        // setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout title={'undefined'} description={'undefined'}>
      <Hero />
      {items && (<Items items={items} />)}
    </MainLayout>
  )
}
