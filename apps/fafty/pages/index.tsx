import MainLayout  from '../layouts/main'
import Hero from '../components/home/hero'
import Items from '../components/items'
import CardPic1 from '../public/card-pic-1.jpeg'
import CardPic2 from '../public/card-pic-2.jpeg'
import CardPic3 from '../public/card-pic-3.jpeg'
import CardPic4 from '../public/card-pic-4.jpeg'
import ItemTypes from '../types/item'
export default function Home() {
  const items: ItemTypes[] = [
    {
      token: 1,
      title: 'Basic Tee',
      slug: 'slug-item',
      thumbnail: {
        src: CardPic1,
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
        src: CardPic1,
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
        src: CardPic3,
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
        src: CardPic4,
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
        src: CardPic2,
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
        src: CardPic1,
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
        src: CardPic1,
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
