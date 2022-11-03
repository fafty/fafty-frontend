const EditorPlaceholder = ({
  header = true,
}: {
  header?: boolean;
}): JSX.Element => {
  const colspans = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    6: 'col-span-6',
  }
  const toolbarPlaceholder = [1, 1, 2, 1, 1, 1, 1]
  const contentPlaceholder = [1, 1, 1, 2, 2, 3, 3, 6]
  return (
    <div className="max-w-auto mx-auto mt-1 w-full rounded-md border border-gray-100 shadow dark:border-neutral-700">
      {header && (
        <div className="h-[48px] bg-white px-4 py-2 dark:bg-neutral-800">
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-1">
                <div className="grid grid-cols-12 gap-2">
                  {toolbarPlaceholder.map((colSpan, index) => (
                    <div
                      key={index}
                      className={`h-6 rounded bg-neutral-300 dark:bg-neutral-700 ${
                        colspans[colSpan as keyof typeof colspans]
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex h-[150px] animate-pulse space-x-4 p-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4">
              {contentPlaceholder.map((colSpan, index) => (
                <div
                  key={index}
                  className={`h-2 rounded bg-neutral-300 dark:bg-neutral-700 col-span-${colSpan}`}
                />
              ))}
            </div>
            <div className="col-span-1 h-2 rounded bg-neutral-300 dark:bg-neutral-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorPlaceholder
