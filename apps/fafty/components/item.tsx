// import { ChartBarIcon, FireIcon, HeartIcon, TrendingUpIcon } from '@heroicons/react/outline';
import Link from 'next/link'
import Image from 'next/image'
import ItemType from '../types/item'

type Props = {
  item: ItemType
}
const Item = ({ item }: Props) => {
  return (
    <>
      <div className='item'>
        <div className="item-wrapper">
          <div className="item-block">
            <div className="item-card">
              <Link href={`/nft/[slug]`} as={`/nft/${encodeURIComponent(item.slug as string)}`}>
                <a className="item-card-link">
                  <div className="thumbnail-wrapper nft">
                    <div className="thumbnail">
                      <Image
                        src={item.thumbnail?.src}
                        style={{ backgroundColor: item.thumbnail?.dominant_color }}
                        loading="lazy"
                        alt={item.title}
                        layout='fill'
                      />
                    </div>
                  </div>
                  <div className="item-card-body">
                    <div className="item-card-content">
                      <div className='item-head'>
                      <div className="item-card-title">
                          <span>{item.title}</span>
                        </div>
                        <div className="item-price">{item.price} {item.ticker}</div>
                      </div>
                    </div>
                    <div className="item-card-action">
                      <button type="button" className="mb-1 w-full bg-gray-600 text-gray-100 rounded-[7px] hover:bg-gray-500 px-2 py-2 focus:outline-none">
                        Buy
                      </button>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item