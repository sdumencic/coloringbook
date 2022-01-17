import "./StartButton.scss";

import { BsFillPlayFill } from "react-icons/bs";
import { MouseEventHandler } from "react";

interface ButtonProps {
	onHover?: MouseEventHandler<HTMLButtonElement>;
	text?: string;
}

const StartButton = (props: ButtonProps) => {
	return (
		// TODO: Make responsive
		<button className="loginsubmit" type="submit" onMouseEnter={props.onHover} onMouseLeave={props.onHover}>
			{props.text}
			<BsFillPlayFill className="floating-button-margin" />
		</button>
	);
};

export default StartButton;
