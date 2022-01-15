import "./Switch.scss";

import { GlobalState } from "../../../redux/store";
import { ImSpinner9 } from "react-icons/im";
import { strings } from "../../../util/language";
import { useSelector } from "react-redux";
import { HiOutlineCursorClick } from "react-icons/hi";
import { BsPencil, BsBrush } from "react-icons/bs";
import { MdOutlineDraw } from "react-icons/md";

interface SwitchProps {
	bgColor?: string;
	textColor?: string;
	spinnerColor?: string;
}

const Switch = (props: SwitchProps) => {
	const language = useSelector((state: GlobalState) => state.settings.language);
	const client = useSelector((state: GlobalState) => state.client);

	return (
		<div
			className="switch-container"
			style={{ backgroundColor: props.bgColor }}
		>
			<HiOutlineCursorClick size={30} className="switch-icon" />
			<label className="switch">
				<input type="checkbox" />
				<span className="slider"></span>
			</label>
			<BsBrush size={30} className="switch-icon" />
		</div>
	);
};

export default Switch;
