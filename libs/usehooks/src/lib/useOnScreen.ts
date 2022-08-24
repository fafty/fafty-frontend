import { MutableRefObject, useEffect, useLayoutEffect, useState } from 'react';

const useOnScreen = <T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = '0px'
): boolean => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);
  return isIntersecting;
};

export default useOnScreen;
