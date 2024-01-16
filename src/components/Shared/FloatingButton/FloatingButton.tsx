import "./FloatingButton.scss";

import * as React from "react";

interface FloatingButtonProps {
	icon?: React.ReactNode;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const FloatingButton = (props: FloatingButtonProps) => {
	return (
		<div className="floating-button" style={props.style} onClick={props.onClick}>
			{props.icon}
		</div>
	);
};

export default FloatingButton;
