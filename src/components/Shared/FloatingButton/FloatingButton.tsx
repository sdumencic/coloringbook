import "./FloatingButton.scss";

import * as React from "react";

import { FiSettings } from "react-icons/fi";

const IMAGE = "/images/220102background.png";
const ZECIC = "/images/zecnoleg1.png";
const ZECICLEG = "/images/zecleg1.png";

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
