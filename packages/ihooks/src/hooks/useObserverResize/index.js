import { useState, useLayoutEffect, useRef } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import { getTargetDom } from '../../utils/index'

/**
 *监听dom大小变化的回调hook
 *
 * @param {*} target
 * @param {*} cb
 * @returns
 */
const useObserverResize = (target, cb) => {
  const refCb = useRef(cb)
  const [state, setState] = useState(() => {
    const targetDom = getTargetDom(target) || {}
    return {
      width: targetDom.clientWidth,
      height: targetDom.clientHeight
    }
  })

  useLayoutEffect(() => {
    
    const targetDom = getTargetDom(target)

    if (!targetDom) {
      return () => {}
    }

    const ResizeObserverObj = new ResizeObserver((entries) => {
      // entries是需要监听的dom节点集合
      for (let entry of entries) {
        setState(() => ({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        }))

        refCb.current && refCb.current({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        })
      }
    })
    ResizeObserverObj.observe(targetDom) // 开启监听

    return () => {
      ResizeObserverObj.disconnect() // 组件卸载时，取消监听
    }

  }, [target])

  return state
}

export default useObserverResize
