import React, { useState, useRef } from 'react'
import { Button } from 'antd'
import { useClickOutside } from 'ihooks'

const IuseClickOutside = () => {
  const [value, setValue] = useState(0)
  const targetRef = useRef()

  const handleClick = (e) => {
    setValue(value + 1)
    console.log(e)
  }

  useClickOutside(handleClick, targetRef)

  return (
    <div>
      <div>
        click counts: {value}
      </div>
      <br/>
      <div ref={targetRef} style={{display: 'inline-block'}}>
        <Button>target dom</Button>
      </div>
    </div>
  )
}

export default IuseClickOutside
