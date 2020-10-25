import { useEffect, useRef } from 'react'
import { getTargetDom } from '../../utils/index'

const useClickOutside = (cb = function() {}, target, eventName = 'click') => {
  let onClick = useRef()
  onClick.current = cb

  useEffect(() => {
    const handler = e => {
      const targetElement = getTargetDom(target)
      if (!targetElement || targetElement.contains(e.target)) {
        return
      }
      onClick.current(e)
    }

    document.addEventListener(eventName, handler)
    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [target])
}

export default useClickOutside
