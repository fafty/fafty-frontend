const UploaderPlaceholder = (): JSX.Element => {
  return (
    <div className="grow h-full">
      <div className="flex flex-row h-full w-full space-x-1 flex-1">
        <div
          className="flex flex-row items-center justify-center flex-1 border-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border-dashed border-gray-300 dark:border-neutral-300"
        >
          <div className="flex flex-col items-center flex-1">
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
            <div className="flex flex-row mt-2">
              <div className="w-12 h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="mx-2 w-6 h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
              <div className="mx-2 w-6 h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
              <div className="mx-2 w-6 h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>

              <div className="w-6 h-3 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
            </div>
            <div className="flex flex-row mt-2">
              <div className="w-10 h-[0.55rem] bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="mx-2 w-6 h-[0.55rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
              <div className="w-6 h-[0.55rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploaderPlaceholder;
