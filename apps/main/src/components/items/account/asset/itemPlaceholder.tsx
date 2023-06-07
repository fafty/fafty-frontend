/**
 * @name ItemPlaceholder
 * @description Item placeholder component.
 * @returns {JSX.Element}
 */
export const ItemPlaceholder = (): JSX.Element => {
  return (
    <div className="duration-350 group relative mx-auto grid h-[6rem] w-full grid-cols-[minmax(300px,_400px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 py-1 text-sm transition hover:bg-white dark:hover:bg-neutral-800/95">
      <div className="z-2 ml-7 flex w-full flex-row items-center overflow-hidden p-1">
        <div className="h-17 w-17 relative flex flex-shrink-0 animate-pulse items-center justify-center rounded bg-neutral-300 hover:bg-neutral-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
          <span className="relative inline-block h-16 w-16 rounded"></span>
        </div>
        <div className="ml-4 -mt-2">
          <div className="h-[0.75rem] w-[10rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
          <div className="mt-2 h-[0.55rem] w-[7rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-800" />
        </div>
      </div>
      <div className="justify-left flex items-center">
        <div className="flex flex-col">
          <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <div className="mt-1 h-[0.75rem] w-[5rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>
      <div className="justify-left flex items-center">
        <div className="h-[0.75rem] w-[2rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
      </div>
      <div className="justify-left flex items-center">
        <div className="h-[0.75rem] w-[3rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
      </div>
      <div className="justify-left flex items-center">
        <div className="h-[0.75rem] w-[2rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
      </div>
      <div className="justify-left flex items-center">
        <div className="h-[0.75rem] w-[2rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </div>
  )
}
