import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import isClient from '../utils/isClient';

export const useWindowWidthChange = (callBack: (changed: number) => any) => {
  const [windowWidth, setWindowWidth] = useState(null)
  useEffect(() => {
    const update = () => {
      const changed = windowWidth - window.innerWidth;
      setWindowWidth(window.innerWidth);
      callBack(changed);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return;
};

export const useEventListener = <HtmlElement>(eventName: string, handler: HtmlElement, element = isClient ? window : undefined) => {
  const savedHandler = useRef(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      const eventListener = (event: any) => savedHandler.current(event)
      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element],
  )
}

export const useWindowSize = (initialWidth: number, initialHeight: number) => {
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  })

  useEventListener('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })
  return windowSize
}


export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  });
  return ref.current
}

// T is a generic type for value parameter, our case this will be string
export const useDebounce = <T>(value: T, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}

// Usage

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   // Debounce search term so that it only gives us latest value ...
//   // ... if searchTerm has not been updated within last 500ms.
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   // Effect for API call
//   useEffect(
//     () => {
//       if (debouncedSearchTerm) {
//         setIsSearching(true);
//         searchCharacters(debouncedSearchTerm).then(results => {
//           setIsSearching(false);
//           setResults(results);
//         });
//       } else {
//         setResults([]);
//       }
//     },
//     [debouncedSearchTerm]
//   );

//   ...
// };


export const useDebouncedFunction = (func: (arg0: any) => void, delay: number|100, cleanUp = false) => {
  const timeoutRef = useRef(null)

  // Очистка таймера
  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
  }

  // Очищаем таймер при анмаунте компонента, если cleanUp выставлен в true
  // и тем самым отменяем последний запланированный вызов
  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp])

  return (...args: any) => {
    clearTimer()
    timeoutRef.current = setTimeout(() => func(args), delay)
  };
}
