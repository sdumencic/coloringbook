import "./Switch.scss";

import { ChangeEventHandler } from "react";

interface SwitchProps {
	checked?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Switch = (props: SwitchProps) => {
	return (
		<div className="switch-container">
			{props.leftIcon}
			<label className="switch">
				<input type="checkbox" checked={props.checked} onChange={props.onChange} />
				<span className="slider"></span>
			</label>
			{props.rightIcon}
		</div>
	);
};

export default Switch;
