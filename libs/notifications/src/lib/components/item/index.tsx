import { NotificationItemProps } from '../../types';
import { XMarkIcon } from '@heroicons/react/24/outline'
import {FC} from "react";

const NotificationItem: FC<NotificationItemProps> = (props) => {
  const { id, open, message, actions, options, onDismiss } = props;
  return (
    <div className={open ? 'animate-slideup' : 'animate-slidedown'}>
      <div className="relative antialiased m-3 p-3 h-auto flex-row flex text-stone-700 dark:text-gray-200 rounded-[7px] focus:outline-none bg-slate-50 dark:bg-neutral-800 border-1 border-gray-100 dark:border-neutral-700 shadow w-[340px]">
        <div className="flex flex-col">
          <div className="text-base font-base">
            New Notification
          </div>
          <div className='message-area mt-2'>
            <p>{message}</p>
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
  );
}

export default NotificationItem;
