const UploaderPlaceholder = (): JSX.Element => {
  return (
    <div className="h-full grow">
      <div className="flex h-full w-full flex-1 flex-row space-x-1">
        <div className="flex flex-1 flex-row items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-neutral-50 dark:border-neutral-300 dark:bg-neutral-800">
          <div className="flex flex-1 flex-col items-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-300"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div className="mt-2 flex flex-row">
              <div className="h-[0.60rem] w-12 rounded bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="col-span-1 mx-2 h-[0.60rem] w-6 rounded bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="col-span-1 mx-2 h-[0.60rem] w-6 rounded bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="col-span-1 mx-2 h-[0.60rem] w-6 rounded bg-neutral-300 dark:bg-neutral-700"></div>

              <div className="col-span-1 h-3 w-6 rounded bg-neutral-300 dark:bg-neutral-700"></div>
            </div>
            <div className="mt-2 flex flex-row">
              <div className="h-[0.55rem] w-10 rounded bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="col-span-1 mx-2 h-[0.55rem] w-6 rounded bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="col-span-1 h-[0.55rem] w-6 rounded bg-neutral-300 dark:bg-neutral-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploaderPlaceholder
