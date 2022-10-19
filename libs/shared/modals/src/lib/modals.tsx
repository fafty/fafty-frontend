import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ModalProps } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const useOnEscape = (
  handler: (event: KeyboardEvent) => void,
  active = true
) => {
  useEffect(() => {
    if (!active) return;
    const listener = (event: KeyboardEvent) => {
      // check if key is an Escape
      if (event.key === 'Escape') handler(event);
    };
    document.addEventListener('keyup', listener);

    return () => {
      if (!active) return;
      document.removeEventListener('keyup', listener);
    };
  }, [handler, active]);
};

const Modal: FC<ModalProps> = (props) => {
  const { title, open, children, actions, options, onDismiss, className } =
    props;
  // const [isOpen, setIsOpen] = useState(true);

  useOnEscape(onDismiss, options?.persist);

  const showInModalVarians = {
    hidden: {
      y: '20px',
      opacity: 0,
    },
    visible: {
      y: '0px',
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
        delay: 0.48,
      },
    },
    exit: {
      y: '20px',
      opacity: 0,
    },
  };
  return (
    <AnimatePresence>
      {open && (
        <div className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur bg-white/50 dark:bg-neutral-800/50 transition-opacity"
            onClick={() => onDismiss()}
          ></motion.div>
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 flex items-center justify-center"
          >
            <motion.div
              variants={showInModalVarians}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={classNames(
                className,
                'relative flex flex-col antialiased m-3 p-3 h-auto text-stone-700 dark:text-gray-200 focus:outline-none bg-slate-50 dark:bg-neutral-800 border-1 border-gray-100 dark:border-neutral-700 shadow rounded-lg max-w-screen-lg'
              )}
            >
              <div className="flex justify-between items-start">
                {title && <div className="text-base font-bold">{title}</div>}
                {options?.dismissible?.active && (
                  <span className="dismiss">
                    <button
                      title={options?.dismissible?.title}
                      type="button"
                      disabled={options?.dismissible?.disabled}
                      onClick={() => onDismiss()}
                      className="mb-1 w-full bg-gray-600 text-gray-100 rounded-full hover:bg-gray-500 px-1 py-1 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600"
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
              {/* h-[calc(70vh)] overflow-y-hidden */}
              <div className="flex flex-1 flex-col">
                <div className="mt-2">{children}</div>
                {actions && (
                  <div className="actions-area">
                    <button
                      type="button"
                      color="#FFF"
                      onClick={actions.first.action}
                    >
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
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
