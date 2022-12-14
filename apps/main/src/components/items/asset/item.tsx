import Link from 'next/link'
import Image from 'next/image'
import { AssetType } from '@fafty/shared/types'

type Props = {
  item: AssetType
}

/**
 * @name Item component for Asset
 * @param {Props} props
 * @param {AssetProps} props.item
 * @returns {JSX.Element}
 * @example
 * <Item item={item} />
 */
const Item = ({ item }: Props): JSX.Element => {
  return (
    <div className="item">
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <Link
              href={'/asset/[slug]'}
              as={`/asset/${encodeURIComponent(item.slug as string)}`}
              className="item-card-link"
            >
              <>
                <div className="thumbnail-wrapper asset">
                  <div className="thumbnail"
                    style={{
                      backgroundColor: item.media?.dominant_color || undefined
                    }}
                  >
                    <Image
                      src={item.media?.src}
                      width="300"
                      height="300"
                      alt={item.name}
                      style={{clipPath: 'inset(0.5px)'}}
                      unoptimized
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
                    <button type="button">Buy</button>
                  </div>
                </div>
              </>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
