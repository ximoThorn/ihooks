import { useEffect, useRef } from 'react'

const useInterval = (callback, delay = 1000) => {
  const cb = useRef()
  const timer = useRef()

  useEffect(() => {
    cb.current = callback
  });

  useEffect(() => {
    function fn() {
      cb.current()
    }
    if (delay !== null && delay !== undefined) {
      timer.current = setInterval(fn, delay)
      return () => timer.current && clearInterval(timer.current)
    }
  }, [delay]);

  return {
    clearInterval() {
      timer.current && clearInterval(timer.current)
    }
  }
}

export default useInterval
