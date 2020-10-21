import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import './divider.scss'

const Divider = props => {
  const { dashed, direction, contentPosition, children } = props

  const classes = useMemo(() => {
    return classnames([
      'divider-default',
      {
        'divider-dashed': dashed,
        [`divider-${direction}`]: direction === 'vertical',
      },
    ])
  }, [dashed, direction])

  const textClasses = useMemo(() => {
    return classnames([
      'divider-text',
      {
        [`divider-${contentPosition}`]: !!contentPosition,
      },
    ])
  }, [contentPosition])

  return (
    <div className={classes}>
      {children && direction === 'horizontal' && <div className={textClasses}>{children}</div>}
    </div>
  )
}

Divider.propTypes = {
  dashed: PropTypes.bool,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  contentPosition: PropTypes.oneOf(['left', 'center', 'right']),
}

Divider.defaultProps = {
  direction: 'horizontal',
  contentPosition: 'left',
}

export default React.memo(Divider)
