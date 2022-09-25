import React, { ReactNode } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { CloseIcon } from '@remixicons/react/fill';
import classNames from 'classnames';

type Props = {
  isOpened: boolean;
  onClose: VoidFunction;
  children: ReactNode;
  className?: string;
  isDisableOnClose?: boolean;
};

export const Modal = ({
  isOpened,
  onClose,
  children,
  className,
  isDisableOnClose,
}: Props) => {
  return (
    <DialogOverlay
      className="fixed w-full flex top-0 left-0 right-0 bottom-0 z-[99999] overflow-hidden flex justify-center items-center bg-neutral-900"
      isOpen={isOpened}
      as="div"
      onClick={() => !isDisableOnClose && onClose()}
    >
      <DialogContent
        className={classNames(
          className,
          'flex w-full items-center justify-center p-0 mx-[4rem] my-[0.5rem] max-w-[480px] outline-none relative'
        )}
        as="div"
        aria-label="modal"
      >
        {children}
      </DialogContent>
      {!isDisableOnClose && (
        <div
          className="flex top-9 z-10 right-10 bg-white-100 justify-center cursor-pointer flex items-center w-10 h-10 rounded-full absolute sm:top-2.5 pointer-events-none"
          onClick={onClose}
          onTouchEnd={onClose}
        >
          <CloseIcon className="w-6 h-6  fill-white" />
        </div>
      )}
    </DialogOverlay>
  );
};
