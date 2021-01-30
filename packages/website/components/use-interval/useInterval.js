import React, { useRef, useState } from 'react'
import { Input, Button } from 'antd'
import { useInterval } from 'ihooks'

const IuseInterval = () => {
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)

  const onInputChange = (e) => {
    const val = e.target.value
    setDelay(val ? +val : 0)
  }
  const interval = useInterval(() => {
    setCount(count + 1)
  }, delay)

  const handleOnClick = () => {
    interval.clearInterval()
  }

  return (
    <div>
      <p>{count}</p>
      <div style={{width: 240}}>
        <Input value={delay} placeholder="请输入间隔时间" onChange={onInputChange} />
      </div>
      <br />
      <Button type="primary" onClick={handleOnClick}>清楚计时器</Button>
    </div>
  )
}

export default IuseInterval
