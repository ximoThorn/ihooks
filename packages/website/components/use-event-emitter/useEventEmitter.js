import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { useEventEmitter } from 'ihooks'


const FriendA = ({$eventEmitter = {}}) => {
  

  const handleInputChange = e => {
    const val = e.target.value
    $eventEmitter.$emit('onInput', val)
    $eventEmitter.$emit('onceInput', val)
  }

  return (
    <div>
      <Input placeholder="输入时触发$emit"
        onChange={e => handleInputChange(e)} />
    </div>
  )
}


const FriendB = ({$eventEmitter = {}}) => {
  const [onRes, seOnRes] = useState('')
  const [onceRes, seOnceRes] = useState('')

  const handleCancel = () => {
    $eventEmitter.$off('onInput')
  }

  $eventEmitter.$on('onInput', val => {
    seOnRes(val)
  })

  $eventEmitter.$once('onceInput', val => {
    seOnceRes(val)
  })

  return (
    <div>
      <br/>
      $on input value: {onRes}
      <br/>
      $once input value: {onceRes}
      <br/>
      <br/>
      <Button onClick={handleCancel}>点击取消监听</Button>
    </div>
  )
}


const IuseEventEmitter = () => {
  const $eventEmitter = useEventEmitter()

  return (
    <div>
      <FriendA $eventEmitter={$eventEmitter} />
      <FriendB $eventEmitter={$eventEmitter} />
    </div>
  )
}

export default IuseEventEmitter
