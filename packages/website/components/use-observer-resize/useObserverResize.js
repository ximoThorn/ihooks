import React, { useRef, useState } from 'react'
import { Button, message } from 'antd'
import { useObserverResize } from 'ihooks'

const IuseObserverResize = () => {
  const targetDomRef = useRef()

  const handleClick = () => {
    const width = targetDomRef.current.clientWidth
    targetDomRef.current.style.width = `${width - 1}px`
  }

  const result = useObserverResize(targetDomRef, ({ width, height }) => {
    message.info(`width:${width}px; height:${height}px`)
  })

  return (
    <div ref={targetDomRef}>
      <Button onClick={handleClick}>click me</Button>
      <p style={{margin: '20px 0'}}>
        尝试点击按钮，去改变目标div的尺寸
      </p>
      改变后的尺寸width：{result.width}px；height: {result.height}px
    </div>
  )
}

export default IuseObserverResize