import React, { useState } from 'react'
import { Button } from 'antd'
import { useDebounce } from 'ihooks'

const IuseDebounce = () => {
  const [value, setValue] = useState(0)
  const debounceClick = () => {
    setValue(value + 1)
  }

  const {
    run: handleClick,
    cancel: debounceCancel
  } = useDebounce(debounceClick, 1000)

  return (
    <div>
      <div>
        click: {value}
      </div>
      <br/>
      <Button onClick={handleClick}
        style={{marginRight: 20}}>
        fast click!
      </Button>
      <Button onClick={debounceCancel}>cancel debounce</Button>
    </div>
  )
}

export default IuseDebounce
