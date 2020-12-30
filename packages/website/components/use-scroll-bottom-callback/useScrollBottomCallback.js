import React, { useRef, useState } from 'react'
import { message } from 'antd'
import { useScrollBottomCallback, useThrottle } from 'ihooks'

const IuseScrollBottomCallback = () => {
  const targetDom = useRef()
  const [list] = useState(() => Array(20).fill())

  const { run: handler } = useThrottle((e) => {
    message.success('哇哇哇、到底部喽')
    console.log(e)
  }, 500)

  useScrollBottomCallback(targetDom, handler, undefined, true)

  return (
    <div ref={targetDom} style={{maxHeight: 300, overflowY: 'scroll'}}>
      {
        list.map((item, index) => {
          return (
            <p key={index}>
              这是第{index + 1}条数据
            </p>
          )
        })
      }
    </div>
  )
}

export default IuseScrollBottomCallback
