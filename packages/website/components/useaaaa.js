import React from 'react'
import { Button } from 'antd'
import { useaaaa } from 'ihooks'

const Aaaa = () => {
  const handleClick = () => {
    useaaaa()
  }

  return (
    <div>
      <Button onClick={handleClick}>测试btn</Button>
    </div>
  )
}

export default Aaaa
