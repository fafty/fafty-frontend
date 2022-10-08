const ItemPlaceholder = () => {
  return (
    <div className="w-full h-[307px]">
      <div className="grow h-full">
        <div className="flex-col border border-neutral-300 dark:border-neutral-700">
          <div className="flex bg-neutral-300 dark:bg-neutral-700 rounded w-full h-[207px] animate-pulse" />
          <div className="flex flex-col p-3 justify-between">
            <div className="flex flex-col">
              <div className=" w-full h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1 animate-pulse" />
              <div className=" w-full mt-1.5 h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1 animate-pulse" />
            </div>
            <div className="w-full h-[40px] mt-1.5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPlaceholder;
