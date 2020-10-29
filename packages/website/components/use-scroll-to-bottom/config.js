export const paramsSource = [
  {
    name: 'target',
    dsc: 'DOM 节点或者 Refs',
    type: '',
    default: '',
    key: '1'
  },
  {
    name: 'callback',
    dsc: '回调函数',
    type: 'function',
    default: 'function (res) {}',
    key: '2'
  },
  {
    name: 'distance',
    dsc: '距离底部多少px时开始触发回调',
    type: 'number',
    default: '50',
    key: '3'
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
    dataIndex: 'dsc'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type'
  },
  {
    title: '默认',
    key: 'default',
    dataIndex: 'default'
  },
]
