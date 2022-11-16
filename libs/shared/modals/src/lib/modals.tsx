import { FC, useEffect } from 'react'
import classNames from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ModalProps } from './types'
import { AnimatePresence, motion } from 'framer-motion'

const useOnEscape = (
  handler: (event: KeyboardEvent) => void,
  active = true
) => {
  useEffect(() => {
    if (!active) return
    const listener = (event: KeyboardEvent) => {
      // check if key is an Escape
      if (event.key === 'Escape') handler(event)
    }
    document.addEventListener('keyup', listener)

    return () => {
      if (!active) return
      document.removeEventListener('keyup', listener)
    }
  }, [handler, active])
}

const Modal: FC<ModalProps> = (props) => {
  const { title, open, children, actions, options, onDismiss, className } =
    props

  useOnEscape(onDismiss, options?.persist)

  // Set document body to overflow hidden when modal is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/50 backdrop-blur transition-opacity dark:bg-neutral-800/50"
            onClick={() => onDismiss()}
          ></motion.div>
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 flex items-center justify-center"
          >
            <motion.div
              variants={{
                hidden: {
                  y: '20px',
                  opacity: 0
                },
                visible: {
                  y: '0px',
                  opacity: 1,
                  transition: {
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 0.48
                  }
                },
                exit: {
                  y: '20px',
                  opacity: 0
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={classNames(
                className,
                'border-1 relative m-3 flex h-auto max-w-screen-lg flex-col rounded-lg border-gray-100 bg-slate-50 p-3 text-stone-700 antialiased shadow focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200'
              )}
            >
              <div className="flex items-start justify-between">
                {title && <div className="text-base font-bold">{title}</div>}
                {options?.dismissible?.active && (
                  <span className="dismiss">
                    <button
                      title={options?.dismissible?.title}
                      type="button"
                      disabled={options?.dismissible?.disabled}
                      onClick={() => onDismiss()}
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
  )
}

export default Modal
