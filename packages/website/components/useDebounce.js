import React from 'react'
import { Button } from 'antd'
import { useDebounce } from 'ihooks'

const IuseDebounce = () => {
  const handleClick = () => {
    useDebounce()
  }

  return (
    <div>
      <Button onClick={handleClick}>测试btn</Button>
    </div>
  )
}

export default IuseDebounce
