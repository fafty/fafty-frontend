const AssetTabsPlaceholder = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-8">
      <div className="flex w-full flex-col items-start justify-start rounded-full border-2 border-gray-200 p-1 dark:border-neutral-700">
        <div className="inline-flex items-start justify-start space-x-2 overflow-hidden">
          <div className="relative flex items-center justify-center rounded-full px-3 py-1.5">
            <div className="z-1 relative text-sm font-bold leading-none outline-none">
              <span className="flex h-[0.9rem] w-[3rem] rounded-lg bg-neutral-50 dark:bg-neutral-600 " />
            </div>
            <div className="absolute top-0 left-0 flex h-full w-full rounded-full bg-gray-700 outline-none dark:bg-white" />
          </div>
          <div className="relative flex items-center justify-center rounded-full px-3 py-1.5">
            <div className="z-1 relative text-sm font-bold leading-none outline-none">
              <span className="flex h-[0.9rem] w-[4rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600" />
            </div>
          </div>
          <div className="relative flex items-center justify-center rounded-full px-3 py-1.5">
            <div className="z-1 relative text-sm font-bold leading-none outline-none">
              <span className="flex h-[0.9rem] w-[4rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600" />
            </div>
          </div>
          <div className="relative flex items-center justify-center rounded-full px-3 py-1.5">
            <div className="z-1 relative text-sm font-bold leading-none outline-none">
              <span className="flex h-[0.9rem] w-[4rem] animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetTabsPlaceholder
