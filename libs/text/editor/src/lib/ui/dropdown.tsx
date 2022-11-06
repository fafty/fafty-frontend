import { ArrowDropDownIcon } from '@remixicons/react/line'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Dropdown({
  buttonIcon,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  dropdownBlockClassName = 'grid gap-2 p-3 grid-cols-1',
  children,
}: {
  buttonIcon?: JSX.Element | string | undefined;
  buttonLabel?: string | undefined;
  buttonAriaLabel?: string;
  buttonClassName: string;
  dropdownBlockClassName?: string;
  children: ReactNode;
}): JSX.Element {
  const dropDownRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const wraperRef = useRef<HTMLDivElement | null>(null)
  const [showDropDown, setShowDropDown] = useState(false)
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const button = buttonRef.current
    const dropDown = dropDownRef.current
    setElement(wraperRef.current)
    if (showDropDown && button !== null && dropDown !== null) {
      const { top, left } = button.getBoundingClientRect()
      dropDown.style.top = `${top + 40}px`
      dropDown.style.left = `${Math.min(
        left,
        window.innerWidth - dropDown.offsetWidth - 20
      )}px`
    }
  }, [dropDownRef, buttonRef, showDropDown])

  useEffect(() => {
    const button = buttonRef.current

    if (button !== null && showDropDown) {
      const handle = (event: { target: any }) => {
        const target = event.target
        if (!button.contains(target)) {
          setShowDropDown(false)
        }
      }
      document.addEventListener('click', handle)

      return () => {
        document.removeEventListener('click', handle)
      }
    } else {
      return () => {}
    }
  }, [dropDownRef, buttonRef, showDropDown])

  return (
    <>
      <div ref={wraperRef} className="relative inline-block">
        <div
          className={`${
            showDropDown ? 'bg-blue-100 dark:bg-neutral-600' : ''
          } ${buttonClassName}`}
          onClick={() => setShowDropDown(!showDropDown)}
          ref={buttonRef}
          role="button"
          aria-label={buttonAriaLabel || buttonLabel}
          aria-haspopup="true"
          aria-expanded={showDropDown}
          aria-hidden={!showDropDown}
        >
          {buttonIcon && <span>{buttonIcon}</span>}

          {buttonLabel && (
            <span className="mx-1 hidden lg:block">{buttonLabel}</span>
          )}
          <ArrowDropDownIcon
            className="h-4 w-4 fill-gray-600 dark:fill-gray-50"
            aria-hidden="true"
          />
        </div>
      </div>

      {showDropDown &&
        element &&
        createPortal(
          <div className="absolute left-1/2 z-20 mt-1 -translate-x-1/2 transform">
            <div
              aria-label="Format text"
              role="dialog"
              className="dropdown z-10"
              ref={dropDownRef}
            >
              <div className="relative w-max max-w-max overflow-scroll rounded bg-white shadow drop-shadow dark:bg-neutral-800">
                <div className="relative max-h-[calc(100vh_-_150px)] overflow-y-auto">
                  <div className={dropdownBlockClassName}>{children}</div>
                </div>
              </div>
            </div>
          </div>,
          element
        )}
    </>
  )
}
