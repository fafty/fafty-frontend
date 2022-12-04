import Link from 'next/link'
import Image from 'next/image'
import { BundleType } from '@fafty/shared/types'

type Props = {
  item: BundleType
}

/**
 * @name Item component for Bundle
 * @param {Props} props
 * @param {BundleType} props.item
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
              href={'/bundle/[slug]'}
              as={`/bundle/${encodeURIComponent(item.slug as string)}`}
              className="item-card-link"
            >
              <>
                <div className="thumbnail-wrapper asset">
                  <div className="thumbnail"
                    style={{
                      backgroundColor: item.cover?.dominant_color || undefined
                    }}
                  >
                    <Image
                      src={item.cover?.src}
                      width="300"
                      height="300"
                      alt={item.name}
                      style={{clipPath: 'inset(0.5px)'}}
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
                      <span>{item.items_count} Items</span>
                    </div>
                    <div>
                      <span>Blockchain: {item.blockchain || 'Undefined'}</span>
                    </div>
                  </div>
                  <div className="item-card-action">
                    {item.items_count != null && item.items_count > 0 && (
                      <div className="pb-3 pt-1">
                        <div className="flex -space-x-4 overflow-hidden">
                          {item.preview_assets
                            ?.slice(0, 3)
                            .map((asset, index) => (
                              <div
                                key={index}
                                className="flex-inline relative overflow-hidden rounded-full border-2 transition duration-150 ease-in-out group-hover:border-white dark:border-neutral-800 dark:group-hover:border-[#2f2f2f]"
                              >
                                <div
                                  className="bg-base-300 h-8 w-8"
                                  style={{
                                    backgroundColor:
                                      asset.media.dominant_color || ''
                                  }}
                                >
                                  <Image
                                    className="relative inline-block h-9 w-9 rounded-full"
                                    src={asset.media.src || ''}
                                    alt=""
                                    width={36}
                                    height={36}
                                    style={{clipPath: 'inset(0.5px)'}}
                                  />
                                </div>
                              </div>
                            ))}
                          {item.items_count > 3 && (
                            <div className="flex-inline relative overflow-hidden rounded-full border-2 transition duration-150 ease-in-out group-hover:border-white dark:border-neutral-800 dark:group-hover:border-[#2f2f2f]">
                              <div className="flex h-full w-8 items-center justify-center bg-neutral-200 dark:bg-neutral-700">
                                <div className="text-sm font-bold">
                                  +{item.items_count - 3}
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
