const BundleItemPlaceholder = () => {
  return (
    <div className="item">
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <div className="item-card-link">
              <div className="thumbnail-wrapper asset">
                <div className="thumbnail">
                  <div className="h-[15rem]">

                  </div>
                </div>
              </div>
              <div className="item-card-body">
                <div className="item-card-content">
                  <div className="item-head">
                    <div className="item-card-title">
                      {/* <span>------</span> */}
                      <span className="flex w-[6rem] h-[0.8rem] mt-1 mb-2 rounded-lg bg-neutral-300 dark:bg-neutral-600 animate-pulse" />
                      <span className="flex w-[3rem] h-[0.8rem] rounded-lg bg-neutral-300 dark:bg-neutral-600 animate-pulse" />

                    </div>
                    <div className="item-price animate-pulse">
                        {/* 0 ICP */}
                        <span className="flex w-[2rem] h-[0.8rem] rounded-lg bg-green-600 animate-pulse" />
                      {/* <span className="w-10 h-3 bg-neutral-300 dark:bg-neutral-600">
                      </span> */}
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
                    <span className="flex w-12 h-5 rounded-lg bg-neutral-300 dark:bg-neutral-600"></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleItemPlaceholder;

