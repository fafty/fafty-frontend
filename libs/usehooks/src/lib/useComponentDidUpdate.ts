import { useEffect, useRef } from 'react'

export default function useComponentDidUpdate<T>(
  callback: (prevProps: T) => void,
  nextProps: T = {} as T
): void {
  const didMount = useRef(false)
  const prevProps = useRef<T>(nextProps)
  useEffect(() => {
    if (didMount.current) {
      callback(prevProps.current)
      prevProps.current = nextProps
    } else {
      didMount.current = true
    }
  })
}
