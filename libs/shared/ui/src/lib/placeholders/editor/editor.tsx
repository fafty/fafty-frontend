const EditorPlaceholder = ({header = true }: { header?: boolean} ): JSX.Element => {
  const colspans = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    6: 'col-span-6',
  }
  const toolbarPlaceholder = [1, 1, 2, 1, 1, 1, 1];
  const contentPlaceholder = [1, 1, 1, 2, 2, 3, 3, 6];
  return (
    <div className="border border-gray-100 dark:border-neutral-700 shadow rounded-md mt-1 max-w-auto w-full mx-auto">
      { header && (
        <div className="bg-white dark:bg-neutral-800 px-4 py-2 h-[48px]">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-1">
                <div className="grid grid-cols-12 gap-2">
                  {toolbarPlaceholder.map((colSpan, index) => (
                    <div key={index} className={`h-6 bg-neutral-300 dark:bg-neutral-700 rounded ${colspans[colSpan as keyof typeof colspans]}`} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="animate-pulse flex space-x-4 p-4 h-[150px]">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4">
              {contentPlaceholder.map((colSpan, index) => (
                <div key={index} className={`h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-${colSpan}`} />
              ))}
            </div>
            <div className="h-2 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorPlaceholder;