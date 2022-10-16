import Link from 'next/link';
import Image from 'next/future/image';
import ItemProps from '../types/item';

type Props = {
  item: ItemProps;
};
const Item = ({ item }: Props) => {
  return (
    <div className="item">
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <Link
              href={`/nft/[slug]`}
              as={`/nft/${encodeURIComponent(item.slug as string)}`}
            >
              <a className="item-card-link">
                <div className="thumbnail-wrapper nft">
                  <div className="thumbnail">
                    <Image
                      src={item.asset.src}
                      style={{
                        backgroundColor: item.asset?.dominant_color,
                      }}
                      width="300"
                      height="300"
                      alt={item.name}
                    />
                  </div>
                </div>
                <div className="item-card-body">
                  <div className="item-card-content">
                    <div className="item-head">
                      <div className="item-card-title">
                        <span>{item.name}</span>
                      </div>
                      <div className="item-price">
                        {item.price} {item.ticker}
                      </div>
                    </div>
                  </div>
                  <div className="item-card-action">
                    <button
                      type="button"
                      className="mb-1 w-full bg-gray-600 text-gray-100 rounded-[7px] hover:bg-gray-500 px-2 py-2 focus:outline-none"
                    >
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
  );
};

export default Item;
