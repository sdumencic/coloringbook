import type * as React from 'react'

import './FloatingButton.css'

interface IFloatingButtonProps {
  icon?: React.ReactNode
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const FloatingButton = (props: IFloatingButtonProps) => {
  return (
    <div className="floating-button" style={props.style} onClick={props.onClick}>
      {props.icon}
    </div>
  )
}

export default FloatingButton
