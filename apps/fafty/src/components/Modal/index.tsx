import React, { FC, ReactNode, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { CloseIcon } from '@remixicons/react/fill';
import classNames from 'classnames';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  title: string;
  isOpened: boolean;
  onClose: VoidFunction;
  children: ReactNode;
  className?: string;
  isDisableOnClose?: boolean;
};

const Modal: FC<Props> = (props) => {

  const { id, open, message, actions, options, onDismiss } = props;
  const [isOpen, setIsOpen] = useState(true)

  if (isOpen) {
    return (
      <div className={isOpened ? 'animate-slideup' : 'animate-slidedown'}>
      <div className="relative antialiased m-3 p-3 h-auto flex-row flex text-stone-700 dark:text-gray-200 rounded-[7px] focus:outline-none bg-slate-50 dark:bg-neutral-800 border-1 border-gray-100 dark:border-neutral-700 shadow w-[340px]">
        <div className="flex flex-col">
          <div className="text-base font-base">
            New Notification
          </div>
          <div className='message-area mt-2'>
            <p>{children}</p>
          </div>
          { actions && (
            <div className='actions-area'>
              <button type="button" color="#FFF" onClick={ actions.first.action }>
                { actions.first.name }
              </button>
              { actions.second && (
                <button type="button" color="#FFF" onClick={ actions.second.action }>
                  { actions.second.name }
                </button>
              )}
            </div>
          )}
        </div>
        { (options?.dismissible && (
          <span className="dismiss">
            <button type="button" onClick={() => onDismiss(id)} className="mb-1 w-full bg-gray-600 text-gray-100 rounded-full hover:bg-gray-500 px-1 py-1 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-4 w-4" strokeWidth="2" width={16} height={16} aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>
    </div>
      // DialogOverlay
      // <div
      //   className="relative z-10"
      //   aria-labelledby="modal-title"
      //   role="dialog"
      //   aria-modal="true"
      //   onClick={() => !isDisableOnClose && onClose()}
      // >
      //   <div
      //     className="fixed inset-0 backdrop-blur bg-white/50 dark:bg-neutral-800/50 transition-opacity"
      //     onClick={() => onClose()}  
      //   ></div>

      //   <div className="fixed inset-0 z-10 overflow-y-auto">
      //     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      //       <div className="relative transform overflow-hidden rounded-lg bg-white/90 dark:bg-neutral-800/90 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      //         <div className="flex flex-col bg-white/50 dark:bg-neutral-800/50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      //           <div className="sm:flex sm:items-start">
      //             <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      //               {!isDisableOnClose && (
      //                 // <div
      //                 //   className="flex pointer top-9 z-10 right-10 bg-white-100 justify-center cursor-pointer flex items-center w-10 h-10 rounded-full absolute sm:top-2.5 pointer-events-none"
      //                 //   onClick={onClose}
      //                 //   onTouchEnd={onClose}
      //                 // >
      //                 //   <CloseIcon className="w-6 h-6 fill-white" />
      //                 // </div>
      //                 <div className="z-10 justify-center cursor-pointer flex items-center right-10">
      //                   <button type="button" onClick={() => onClose()} className="mb-1 w-full bg-gray-600 text-gray-100 rounded-full hover:bg-gray-500 px-1 py-1 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
      //                     <span className="sr-only">Close menu</span>
      //                     <XMarkIcon className="h-4 w-4" strokeWidth="2" width={16} height={16} aria-hidden="true" />
      //                   </button>
      //                 </div>
      //               )}
      //             </div>
      //             <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      //               <h3
      //                 className="text-lg font-medium leading-6 text-gray-900"
      //                 id="modal-title"
      //               >
      //                 {title}
      //               </h3>
      //               <div className="mt-2">
      //                 <div
      //                   className="flex w-full items-center justify-center"
      //                 >
      //                   {children}

      //                 </div>
      //                 {/* <DialogContent

                        
      //                   as="div"
      //                 >
      //                 </DialogContent> */}
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      //           <button
      //             type="button"
      //             className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      //           >
      //             Deactivate
      //           </button>
      //           <button
      //             type="button"
      //             className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      //           >
      //             Cancel
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
};

export default Modal;