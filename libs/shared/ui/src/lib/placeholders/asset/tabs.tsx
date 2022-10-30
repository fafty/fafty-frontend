const AssetTabsPlaceholder = () => {
  return (
    <div className="flex flex-col space-y-8 items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full p-1 border-2 rounded-full border-gray-200 dark:border-neutral-700">
        <div className="inline-flex space-x-2 items-start justify-start overflow-hidden">
          <div className="flex items-center relative justify-center px-3 py-1.5 rounded-full">
            <div className="relative outline-none text-sm font-bold leading-none z-1">
              <span className="flex w-[3rem] h-[0.9rem] rounded-lg bg-neutral-50 dark:bg-neutral-600 " />
            </div>
            <div className="absolute flex w-full h-full rounded-full top-0 left-0 outline-none bg-gray-700 dark:bg-white" />
          </div>
          <div className="flex items-center relative justify-center px-3 py-1.5 rounded-full">
            <div className="relative outline-none text-sm font-bold leading-none z-1">
              <span className="flex w-[4rem] h-[0.9rem] rounded-lg bg-neutral-300 dark:bg-neutral-600 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center relative justify-center px-3 py-1.5 rounded-full">
            <div className="relative outline-none text-sm font-bold leading-none z-1">
              <span className="flex w-[4rem] h-[0.9rem] rounded-lg bg-neutral-300 dark:bg-neutral-600 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center relative justify-center px-3 py-1.5 rounded-full">
            <div className="relative outline-none text-sm font-bold leading-none z-1">
              <span className="flex w-[4rem] h-[0.9rem] rounded-lg bg-neutral-300 dark:bg-neutral-600 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTabsPlaceholder;
