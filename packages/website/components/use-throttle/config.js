import React from 'react'

export const dataParams = [
  {
    name: 'fun',
    dsc: '需要做节流处理的函数',
    type: 'function',
    default: 'function () {}',
    key: '1'
  },
  {
    name: 'wait',
    dsc: '间隔时间，单位ms',
    type: 'number',
    default: 300,
    key: '2'
  },
  {
    name: 'options',
    dsc: '配置信息, 详情参考：',
    type: 'object',
    default: '{}',
    key: '3',
    link: 'https://www.lodashjs.com/docs/lodash.throttle'
  }
]

export const paramsColumns = [
  {
    title: '参数',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '说明',
    key: 'dsc',
    dataIndex: 'dsc',
    render: (dsc, { link }) => {
      if (link) {
        return (
          <span>
            {dsc}<a href={link}>lodash.throttle</a>
          </span>
        )
      }
      return dsc
    }
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type'
  },
  {
    title: '默认值',
    key: 'default',
    dataIndex: 'default'
  },
]

export const dataResult = [
  {
    name: 'run',
    dsc: '节流处理后的函数',
    key: '1'
  },
  {
    name: 'cancel',
    dsc: '取消节流的函数',
    key: '2'
  }
]

export const resultColumns = [
  {
    title: '参数',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '说明',
    key: 'dsc',
    dataIndex: 'dsc'
  },
]

