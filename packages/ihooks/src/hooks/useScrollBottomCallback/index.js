import { useEffect, useRef } from 'react'
import { getTargetDom } from '../../utils/index'

const useScrollBottomCallback = (targetDom, cb, distance = 50, once = false) => {
  const callbackRef = useRef(cb)
  const isOnce = useRef(once)
  const flag = useRef(false)

  useEffect(() => {
    const dom = getTargetDom(targetDom) || document
    dom.addEventListener('scroll', (e) => {
      const { target } = e
      // 滚动到底部
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - distance) {
        if (!flag.current) {
          callbackRef.current && callbackRef.current(e)
          isOnce && (flag.current = true)
        }
      } else {
        flag.current = false
      }
    })
    return () => {
      dom && dom.removeEventListener('scroll', () => {})
    }

  }, [targetDom]);
}

export default useScrollBottomCallback
