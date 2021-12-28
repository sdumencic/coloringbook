import { MouseEventHandler } from "react";
import "./Button.scss";

interface ButtonProps {
    onHover?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
    return (
        // TODO: Make responsive
        <button className="loginsubmit" type="submit" onMouseEnter={props.onHover} onMouseLeave={props.onHover}>Submit</button>
    )
}

export default Button;