import "./ErrorPage.scss";

import { FcUndo } from "react-icons/fc";
import { FiSettings } from "react-icons/fi";
import FloatingButton from "../Shared/FloatingButton/FloatingButton";
import { GlobalState } from "../../redux/store";
import { Link } from "react-router-dom";
import { strings } from "../../util/language";
import { useSelector } from "react-redux";

const IMAGE = "/images/220108backgroundlama.png";

const ErrorPage = () => {
	const { language } = useSelector((state: GlobalState) => state.settings);

	const style = {
		backgroundImage: `url(${IMAGE})`,
	};

	return (
		<div className="loginBackground" style={style}>
			<h1 className="error-page-title">
				{strings[language].homePage.altImgRabbit}
			</h1>

			<Link to="/">
				<FloatingButton
					icon={<FcUndo size={30} className="floating-button-icon" />}
					style={{ top: "10px", left: "10px" }}
				/>
			</Link>
			<Link to="/settings">
				<FloatingButton
					icon={<FiSettings size={30} className="floating-button-icon" />}
					style={{ top: "10px", right: "10px" }}
				/>
			</Link>
		</div>
	);
};

export default ErrorPage;
