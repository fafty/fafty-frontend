import Link from 'next/link';
import Image from 'next/future/image';
import { BundleProps } from '@fafty-frontend/shared/api';

type Props = {
  item: BundleProps;
};

const Item = ({ item }: Props) => {
  return (
    <div className="item">
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <Link
              href={`/bundle/[slug]`}
              as={`/bundle/${encodeURIComponent(item.slug as string)}`}
            >
              <a className="item-card-link">
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
                      <span>{item.total_assets_count} Items</span>
                    </div>
                    <div>
                      <span>Blockchain: {item.blockchain || 'Undefined'}</span>
                    </div>
                  </div>
                  <div className="item-card-action">
                    { item.total_assets_count != null && item.total_assets_count > 0 && (
                      <div className="pb-3 pt-1">

                        <div className="flex overflow-hidden -space-x-4">
                          { item.preview_assets?.slice(0, 3).map((asset, index) => (
                            <div key={index} className="relative flex-inline rounded-full overflow-hidden border-2">
                              <div className="w-8 h-8 bg-base-300"
                                style={{ backgroundColor: asset.media.dominant_color || '' }}
                              >
                              <Image
                                className="relative inline-block h-9 w-9 rounded-full ring-1 ring-white"
                                src={asset.media.src || ''}
                                alt=""
                                width={36}
                                height={36}
                                />
                              </div>
                            </div>
                          )) }
                          { item.total_assets_count > 3 && (
                            <div className="relative flex-inline rounded-full overflow-hidden border-2">
                              <div className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 w-8 h-full">
                                <div className="font-bold">+{item.total_assets_count-3}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <button type="button">
                      See
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
