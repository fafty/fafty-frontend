// import { useEffect, useRef } from 'react'

// import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

// const useTimeout = (callback: () => void, delay: number | null) =>{
//   const savedCallback = useRef(callback)

//   // Remember the latest callback if it changes.
//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])

//   // Set up the timeout.
//   useEffect(() => {
//     // Don't schedule if no delay is specified.
//     // Note: 0 is a valid value for delay.
//     if (!delay && delay !== 0) return

//     const id = setTimeout(() => savedCallback.current(), delay)

//     return () => clearTimeout(id)
//   }, [delay])
// }

// export default useTimeout;

import { useEffect, useCallback, useRef } from 'react'

// React hook for delaying calls with time
// returns callback to use for cancelling

const useTimeout = (
  callback: () => void, // function to call. No args passed.
  // if you create a new callback each render, then previous callback will be cancelled on render.
  timeout = 0 // delay, ms (default: immediately put into JS Event Queue)
): (() => void) => {
  const timeoutIdRef = useRef<NodeJS.Timeout>()
  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current
    if (timeoutId) {
      timeoutIdRef.current = undefined
      clearTimeout(timeoutId)
    }
  }, [timeoutIdRef])

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout)
    return cancel
  }, [callback, timeout, cancel])

  return cancel
}

export default useTimeout
