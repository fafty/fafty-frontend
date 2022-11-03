const BundleItemPlaceholder = () => {
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
                    <div className="item-price animate-pulse">
                      <span className="flex h-[0.8rem] w-[2rem] animate-pulse rounded-lg bg-green-600" />
                    </div>
                  </div>
                </div>
                <div className="item-card-action animate-pulse">
                  <button
                    title="View"
                    type="button"
                    className="flex items-center justify-center"
                  >
                    <div>
                      <span className="flex h-5 w-12 rounded-lg bg-neutral-300 dark:bg-neutral-600"></span>
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

export default BundleItemPlaceholder
