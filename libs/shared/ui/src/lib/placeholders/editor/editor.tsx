const EditorPlaceholder = (): JSX.Element => {
  return (
    <>
      <div className="border border-gray-100 dark:border-neutral-700 shadow rounded-md my-4 max-w-[600px] w-full mx-auto">
        <div className="bg-white dark:bg-neutral-800 px-4 py-2">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-1">
                <div className="grid grid-cols-8 gap-4">
                  <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded col-span-2"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
                  <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="animate-pulse flex space-x-4 p-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4">
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-2"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-2"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-3"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-3"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-6"></div>
              </div>
              <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditorPlaceholder;