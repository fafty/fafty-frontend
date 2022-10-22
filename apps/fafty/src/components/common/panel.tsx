import { ReactElement, useState } from 'react';
import { ArrowDownSIcon, ArrowUpSIcon } from '@remixicons/react/line';
import classNames from 'classnames';

type Props = {
  title: string;
  initialState?: boolean;
  children?: ReactElement;
};

export const Panel = ({ children, initialState, title }: Props) => {
  const [isOpened, setIsOpened] = useState(!!initialState);

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpened(!isOpened)}
        className={classNames(
          'flex justify-between items-center cursor-pointer rounded dark:hover:bg-neutral-700',
          {
            'mb-2.5': isOpened,
          }
        )}
      >
        <span className="dark:text-white text-slate-900 text-lg font-bold w-full p-2.5">
          {title}
        </span>
        {!isOpened ? (
          <ArrowUpSIcon className="dark:fill-white fill-white-900 w-6 h-6 mr-2.5" />
        ) : (
          <ArrowDownSIcon className="dark:fill-white fill-white-900 w-6 h-6 mr-2.5" />
        )}
      </div>
      {isOpened && children}
    </div>
  );
};
