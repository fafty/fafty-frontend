import { NotificationItemProps } from '../../types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

const NotificationItem: FC<NotificationItemProps> = (props) => {
  const { title, id, open, message, actions, options, onDismiss } = props
  return (
    <div className={open ? 'animate-slideup' : 'animate-slidedown'}>
      <div className="border-1 relative m-3 flex	h-auto w-[340px] flex-row justify-between rounded-[7px] border-gray-100 bg-slate-50 p-3 text-stone-700 antialiased shadow focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200">
        <div className="flex flex-col">
          {title && <div className="text-base font-bold">{title}</div>}
          <div className="message-area mt-2">
            <p>{message}</p>
          </div>
          {actions && (
            <div className="actions-area">
              <button type="button" color="#FFF" onClick={actions.first.action}>
                {actions.first.name}
              </button>
              {actions.second && (
                <button
                  type="button"
                  color="#FFF"
                  onClick={actions.second.action}
                >
                  {actions.second.name}
                </button>
              )}
            </div>
          )}
        </div>
        {options?.dismissible && (
          <span className="dismiss">
            <button
              type="button"
              onClick={() => onDismiss(id)}
              className="mb-1 w-full rounded-full bg-gray-600 px-1 py-1 text-gray-100 hover:bg-gray-500 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-4 w-4"
                strokeWidth="2"
                width={16}
                height={16}
                aria-hidden="true"
              />
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default NotificationItem
