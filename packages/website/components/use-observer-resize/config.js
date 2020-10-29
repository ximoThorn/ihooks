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


export const resultSource = [
  {
    name: 'res',
    dsc: 'dom节点的尺寸',
    type: 'object',
    default: '{width: "", height: ""}',
    key: '1'
  },
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