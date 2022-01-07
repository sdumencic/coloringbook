import { MouseEventHandler } from "react";
import "./Button.scss";

interface ButtonProps {
	onHover?: MouseEventHandler<HTMLButtonElement>;
	text?: string;
}

const Button = (props: ButtonProps) => {
	return (
		// TODO: Make responsive
		<button
			className="loginsubmit"
			type="submit"
			onMouseEnter={props.onHover}
			onMouseLeave={props.onHover}
		>
			{props.text}
		</button>
	);
};

export default Button;
