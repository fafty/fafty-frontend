import { ReactElement, useState } from 'react'
import { ArrowDownSIcon, ArrowUpSIcon } from '@remixicons/react/line'
import classNames from 'classnames'

type Props = {
  title: string;
  initialState?: boolean;
  children?: ReactElement;
};

export const Panel = ({ children, initialState, title }: Props) => {
  const [isOpened, setIsOpened] = useState(!!initialState)

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpened(!isOpened)}
        className={classNames(
          'flex cursor-pointer items-center justify-between rounded dark:hover:bg-neutral-700',
          {
            'mb-2.5': isOpened,
          }
        )}
      >
        <span className="w-full p-2.5 text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </span>
        {!isOpened ? (
          <ArrowUpSIcon className="fill-white-900 mr-2.5 h-6 w-6 dark:fill-white" />
        ) : (
          <ArrowDownSIcon className="fill-white-900 mr-2.5 h-6 w-6 dark:fill-white" />
        )}
      </div>
      {isOpened && children}
    </div>
  )
}
