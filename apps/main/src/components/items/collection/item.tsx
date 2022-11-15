import Link from 'next/link'
import Image from 'next/image'
import { CollectionProps } from '@fafty/shared/api'

type Props = {
  item: CollectionProps;
};

/**
 * @name Item component for Collection
 * @param {Props} props
 * @param {CollectionProps} props.item
 * @returns {JSX.Element}
 * @example
 * <Item item={item} />
 */
const Item = ({ item }: Props): JSX.Element => {
  return (
    <div className="item group">
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <Link
              href={'/collection/[slug]'}
              as={`/collection/${encodeURIComponent(item.slug as string)}`}
              className="item-card-link"
            >
              <>
                <div className="thumbnail-wrapper asset">
                  <div className="thumbnail">
                    <Image
                      src={item.cover?.src}
                      style={{
                        backgroundColor:
                          item.cover?.dominant_color || undefined,
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
                    </div>
                    <div>
                      <span>Total Items: {item.supply}</span>
                    </div>
                    <div>
                      <span>Listed Items: {item.listed_count}</span>
                    </div>
                    <div>
                      <span>Sales Volume: {item.sales_volume} ICP</span>
                    </div>
                    <div>
                      <span>Blockchain: {item.blockchain || 'Undefined'}</span>
                    </div>
                  </div>
                  <div className="item-card-action">
                    {item.supply != null &&
                      item.supply > 0 && (
                        <div className="pb-3 pt-1">
                          <div className="flex -space-x-4 overflow-hidden">
                            {item.preview_assets
                              ?.slice(0, 3)
                              .map((asset, index) => (
                                <div
                                  key={index}
                                  className="flex-inline relative overflow-hidden rounded-full border-2 group-hover:border-white dark:group-hover:border-[#2f2f2f] dark:border-neutral-800 transition duration-150 ease-in-out"
                                >
                                  <div
                                    className="bg-base-300 h-8 w-8"
                                    style={{
                                      backgroundColor:
                                        asset.media.dominant_color || '',
                                    }}
                                  >
                                    <Image
                                      className="relative inline-block h-9 w-9 rounded-full"
                                      src={asset.media.src || ''}
                                      alt=""
                                      width={36}
                                      height={36}
                                    />
                                  </div>
                                </div>
                              ))}
                            {item.supply > 3 && (
                              <div className="flex-inline relative overflow-hidden rounded-full border-2 group-hover:border-white dark:group-hover:border-[#2f2f2f] dark:border-neutral-800 transition duration-150 ease-in-out">
                                <div className="flex h-full w-8 items-center justify-center bg-neutral-200 dark:bg-neutral-700">
                                  <div className="text-sm font-bold">
                                    +{item.supply - 3}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    <button type="button">See</button>
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
