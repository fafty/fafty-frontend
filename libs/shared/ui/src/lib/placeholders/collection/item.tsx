const AssetItemPlaceholder = () => {
  return (
    <div className="item">
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <div className="item-card-link">
              <div className="thumbnail-wrapper asset">
                <div className="thumbnail">
                  <div className="h-[15rem]"></div>
                </div>
              </div>
              <div className="item-card-body">
                <div className="item-card-content">
                  <div className="item-head">
                    <div className="item-card-title">
                      <span className="mt-1 mb-2 flex h-[0.8rem] w-[6rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600" />
                      <span className="flex h-[0.8rem] w-[3rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600" />
                    </div>
                  </div>
                </div>
                <div className="item-card-action animate-pulse">
                  <div className="pb-3 pt-1">
                    <div className="justify-left flex items-center">
                      <div className="flex -space-x-4 overflow-hidden">
                        {Array.from({ length: 4 }, (_, index) => (
                          <div
                            key={index}
                            className="flex-inline relative overflow-hidden rounded-full"
                          >
                            <div className="h-9 w-9 animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    title="View"
                    type="button"
                    className="flex items-center justify-center"
                  >
                    <div>
                      <span className="flex h-5 w-12 rounded-lg bg-white dark:bg-neutral-600"></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetItemPlaceholder
