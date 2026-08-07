import type { ChangeEventHandler } from 'react'

import './Switch.css'

interface ISwitchProps {
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Switch = (props: ISwitchProps) => {
  return (
    <div className="switch-container">
      {props.leftIcon}
      <label className="switch">
        <input type="checkbox" checked={props.checked} onChange={props.onChange} />
        <span className="slider"></span>
      </label>
      {props.rightIcon}
    </div>
  )
}

export default Switch
