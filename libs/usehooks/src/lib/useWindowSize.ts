import { useState } from 'react'
import useEventListener from './useEventListener'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useWindowSize(): readonly [number, number] {
  const [windowSize, setWindowSize] = useState<readonly [number, number]>([
    0, 0
  ])

  const handleSize = () => {
    setWindowSize([
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ])
  }

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}

export default useWindowSize
