import type { MouseEventHandler } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'

import './StartButton.css'

interface IButtonProps {
  onHover?: MouseEventHandler<HTMLButtonElement>
  text?: string
}

const StartButton = (props: IButtonProps) => {
  return (
    // TODO: Make responsive
    <button className="loginsubmit" type="submit" onMouseEnter={props.onHover} onMouseLeave={props.onHover}>
      {props.text}
      <BsFillPlayFill className="floating-button-margin" />
    </button>
  )
}

export default StartButton
