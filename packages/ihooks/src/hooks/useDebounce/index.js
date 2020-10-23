import debounce from 'lodash.debounce'
import { useRef, useMemo } from 'react'

const useDebounce = (fun = function() {}, wait = 300, options = {}) => {

  // 保证每次接收到的fun是最新的，而且不会触发debounced函数重新绑定
  const funRef = useRef()
  funRef.current = fun

  const debounced = useMemo(() => debounce((...arg) => {
    return funRef.current(...arg)
  }, wait, options), [])

  return {
    run: debounced,
    cancel: debounced.cancel
  }

}

export default useDebounce
