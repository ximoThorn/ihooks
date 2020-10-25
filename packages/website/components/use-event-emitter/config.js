export const dataSource = [
  {
    name: '$emit',
    dsc: '推送一个事件通知',
    type: 'function',
    default: 'function (method, arg) {}',
    key: '1'
  },
  {
    name: '$on',
    dsc: '订阅一个事件通知',
    type: 'function',
    default: 'function (method, val) {}',
    key: '2'
  },
  {
    name: '$once',
    dsc: '订阅一次事件通知',
    type: 'function',
    default: 'function (method, val) {}',
    key: '3',
  },
  {
    name: '$off',
    dsc: '取消订阅事件通知',
    type: 'function',
    default: 'function (method) {}',
    key: '4',
  }
]


export const dataColumns = [
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