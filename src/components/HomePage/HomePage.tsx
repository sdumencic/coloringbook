import "./HomePage.scss";

import { MouseEvent, useEffect, useRef, useState } from "react";

import Button from "../Shared/Button/Button";
import { FiSettings } from "react-icons/fi";
import { GlobalState } from "../../redux/store";
import Hud from "../Shared/Hud/Hud";
import { Link } from "react-router-dom";
import { strings } from "../../util/language";
import { useSelector } from "react-redux";

const IMAGE = "/images/220102background.png";
const ZECIC = "/images/zecnoleg1.png";
const ZECICLEG = "/images/zecleg1.png";

const HomePage = () => {
	const style = {
		backgroundImage: `url(${IMAGE})`,
	};

	const { language } = useSelector((state: GlobalState) => state.settings);

	const [change, setChange] = useState(false);

	const changeAnimate = () => {
		if (change === true) {
			setChange(false);
		} else {
			setChange(true);
		}
	};

	return (
		<div className="loginBackground" style={style}>
			<form className="loginform">
				<div className="loginformheader">
					<h1 className="title" onClick={changeAnimate}>
						{strings[language].homePage.title}
					</h1>
				</div>
				<div className="loginformbody">
					<img
						className="image1"
						src={ZECIC}
						alt={strings[language].homePage.altImgRabbit}
					/>
					<img
						className={`image2 ${change ? "leg" : " "}`}
						src={ZECICLEG}
						alt={strings[language].homePage.altImgRabbitLeg}
					/>
					<Link to="/game">
						<Button
							onHover={changeAnimate}
							text={strings[language].homePage.start}
						/>
					</Link>
				</div>
			</form>
			<Link to="/settings">
				<Hud icon={<FiSettings size={30} className="hud-icon" />} />
			</Link>
		</div>
	);
};

export default HomePage;
