export const dataParams = [
  {
    name: 'fun',
    dsc: '点击目标dom外的处理函数',
    type: 'function',
    default: 'function (event) {}',
    key: '1'
  },
  {
    name: 'target',
    dsc: '目标dom',
    type: 'dom对象/useRef的返回值/function',
    default: '',
    key: '2'
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