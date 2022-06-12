import MainLayout  from '../layouts/main'
import Hero from '../components/home/hero'
import Items from '../components/items'

import ItemProps from '../types/item'
export default function Home(): JSX.Element {
  const items: ItemProps[] = [
    {
      token: 1,
      title: 'Basic Tee',
      slug: 'slug-item',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#314'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3],
      cardCounter: 3,
    },
    {
      token: 2,
      title: 'Basic Tee112',
      slug: 'slug-item2',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#322'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 4,
    },
    {
      token: 3,
      title: 'Basic Tee1222',
      slug: 'slug-item22',
      thumbnail: {
        src: '/images/card-pic-3.jpeg',
        dominant_color: '#334'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 2,
    },
    {
      token: 4,
      title: 'Basic Tee112',
      slug: 'slug-item12222',
      thumbnail: {
        src: '/images/card-pic-4.jpeg',
        dominant_color: '#111'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    },
    {
      token: 5,
      title: 'Basic Tee1122223',
      slug: 'slug-item233',
      thumbnail: {
        src: '/images/card-pic-2.jpeg',
        dominant_color: '#234'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    },
    {
      token: 6,
      title: 'Basic Tee3345432',
      slug: 'slug-item11222',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#334'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    },
    {
      token: 6,
      title: 'Basic Tee3345432',
      slug: 'slug-item11222',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#334'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    },
    {
      token: 1,
      title: 'Basic Tee',
      slug: 'slug-item',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#314'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3],
      cardCounter: 3,
    },
    {
      token: 2,
      title: 'Basic Tee112',
      slug: 'slug-item2',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#322'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 4,
    },
    {
      token: 3,
      title: 'Basic Tee1222',
      slug: 'slug-item22',
      thumbnail: {
        src: '/images/card-pic-3.jpeg',
        dominant_color: '#334'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 2,
    },
    {
      token: 4,
      title: 'Basic Tee112',
      slug: 'slug-item12222',
      thumbnail: {
        src: '/images/card-pic-4.jpeg',
        dominant_color: '#111'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    },
    {
      token: 5,
      title: 'Basic Tee1122223',
      slug: 'slug-item233',
      thumbnail: {
        src: '/images/card-pic-2.jpeg',
        dominant_color: '#234'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    },
    {
      token: 6,
      title: 'Basic Tee3345432',
      slug: 'slug-item11222',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#334'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    },
    {
      token: 6,
      title: 'Basic Tee3345432',
      slug: 'slug-item11222',
      thumbnail: {
        src: '/images/card-pic-1.jpeg',
        dominant_color: '#334'
      },
      price: 35.12,
      ticker: 'ETH',
      cardUser: [1, 2, 3, 4],
      cardCounter: 3,
    }
  ]
  return (
    <MainLayout title={'undefined'} description={'undefined'}>
      <Hero />
      <Items items={items} />
    </MainLayout>
  )
}
