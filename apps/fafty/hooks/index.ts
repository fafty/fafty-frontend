import { useEffect, useRef } from 'react';

export const useDebouncedCallback = (
  callback: () => void,
  delay: number | 100,
  cleanUp = false
) => {
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  // Очистка таймера
  function clearTimer() {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = undefined;
    }
  }

  // Очищаем таймер при анмаунте компонента, если cleanUp выставлен в true
  // и тем самым отменяем последний запланированный вызов
  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return () => {
    clearTimer();
    timeoutIdRef.current = setTimeout(() => callback(), delay);
  };
};
