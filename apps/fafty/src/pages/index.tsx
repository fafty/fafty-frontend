import MainLayout from '../layouts/main';
import Hero from '../components/home/hero';
import Items from '../components/items';

import { AssetProps } from '@fafty-frontend/shared/api';
import { useEffect, useState } from 'react';
import { api } from '@fafty-frontend/shared/api';

type ResponceProps = {
  records: AssetProps[];
};

export default function Home(): JSX.Element {
  const [items, setItems] = useState<AssetProps[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const response = await api.get<ResponceProps>(`assets`);
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
    <MainLayout title={'undefined'} description={'undefined'} className="container">
      <Hero />
      {items && <Items items={items} />}
    </MainLayout>
  );
}
