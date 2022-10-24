const ItemPlaceholder = () => {
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
                      <span className="flex w-[6rem] h-[0.8rem] mt-1 mb-2 rounded-lg bg-white dark:bg-neutral-600 animate-pulse" />
                      <span className="flex w-[3rem] h-[0.8rem] rounded-lg bg-white dark:bg-neutral-600 animate-pulse" />

                    </div>
                    <div className="item-price animate-pulse">
                        {/* 0 ICP */}
                        <span className="flex w-[2rem] h-[0.8rem] rounded-lg bg-green-600 animate-pulse" />
                      {/* <span className="w-10 h-3 bg-white dark:bg-neutral-600">
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="item-card-action animate-pulse">
                  <button
                    type="button"
                    className="flex items-center justify-center"
                  >
                    <div>
                    <span className="flex w-12 h-5 rounded-lg bg-white dark:bg-neutral-600"></span>
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

export default ItemPlaceholder;

// const ItemPlaceholder = () => {
//   return (
//     <div className="w-full h-[307px]">
//       <div className="grow h-full">
//         <div className="flex-col border border-neutral-300 dark:border-neutral-700">
//           <div className="flex bg-neutral-300 dark:bg-neutral-700 rounded w-full h-[207px] animate-pulse" />
//           <div className="flex flex-col p-3 justify-between">
//             <div className="flex flex-col">
//               <div className=" w-full h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1 animate-pulse" />
//               <div className=" w-full mt-1.5 h-[0.60rem] bg-neutral-300 dark:bg-neutral-700 rounded col-span-1 animate-pulse" />
//             </div>
//             <div className="w-full h-[40px] mt-1.5 bg-neutral-300 dark:bg-neutral-700 rounded col-span-1 animate-pulse" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemPlaceholder;
