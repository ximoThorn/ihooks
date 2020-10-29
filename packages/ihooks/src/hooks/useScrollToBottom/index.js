import { useEffect, useRef } from 'react'
import { getTargetDom } from '../../utils/index'

const useScrollToBottom = (targetDom, cb, distance = 50) => {
  const callbackRef = useRef(cb)

  useEffect(() => {
    
    const dom = getTargetDom(targetDom) || document

    dom.addEventListener('scroll', (e) => {
      const { target } = e
      // 滚动到底部
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - distance) {
        callbackRef.current && callbackRef.current(e)
      }
    })
    return () => {
      dom && dom.removeEventListener('scroll', () => {})
    }

  }, [targetDom]);
}

export default useScrollToBottom
