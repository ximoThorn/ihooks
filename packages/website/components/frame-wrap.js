import React from 'react'
import components from '@theme/MDXComponents'
import {
  Card,
  Divider,
  Collapse
} from 'antd'


const FrameWrap = (props = {}) => {
  const {
    title = 'title',
    dsc = 'xxxxxxx',
    example,
    code = ''
  } = props

  return (
    <Card>
      {example}
      <Divider orientation="left">{title}</Divider>
      <div>
        {dsc}
      </div>
      <Collapse
        expandIcon={() => null}
        ghost>
        <Collapse.Panel header="</>" key="1">
          <components.pre>
            <components.code className={'language-jsx'}>
              {code}
            </components.code>  
          </components.pre>
        </Collapse.Panel>
      </Collapse>
    </Card>
  )
}

export default FrameWrap
