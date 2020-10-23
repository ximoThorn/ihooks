import React, { useState } from 'react'
import { Button } from 'antd'
import { useThrottle } from 'ihooks'

const IuseThrottle = () => {
  const [value, setValue] = useState(0)
  const throttleClick = () => {
    setValue(value + 1)
  }

  const {
    run: handleClick,
  } = useThrottle(throttleClick, 1000)

  return (
    <div>
      <div>
        click: {value}
      </div>
      <br/>
      <Button onClick={handleClick}>
        fast click!
      </Button>
    </div>
  )
}

export default IuseThrottle
