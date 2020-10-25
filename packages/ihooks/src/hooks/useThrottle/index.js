import throttle from 'lodash/throttle'
import { useRef, useMemo } from 'react'

const useThrottle= (fun = function() {}, wait = 300, options = {}) => {

  // 保证每次接收到的fun是最新的，而且不会触发throttled函数重新绑定
  const funRef = useRef()
  funRef.current = fun

  const throttled = useMemo(() => throttle((...arg) => {
    return funRef.current(...arg)
  }, wait, options), [])

  return {
    run: throttled,
    cancel: throttled.cancel
  }

}

export default useThrottle
