import * as React from "react";
import "./Hud.scss";
import { FiSettings } from "react-icons/fi";

const IMAGE = "/images/220102background.png";
const ZECIC = "/images/zecnoleg1.png";
const ZECICLEG = "/images/zecleg1.png";

interface HudProps {
	icon?: React.ReactNode;
}

const Hud = (props: HudProps) => {
	return <div className="hud">{props.icon}</div>;
};

export default Hud;
