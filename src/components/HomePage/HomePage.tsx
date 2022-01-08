import "./HomePage.scss";

import { MouseEvent, useEffect, useRef, useState } from "react";

import Button from "./Button/StartButton";
import { FiSettings } from "react-icons/fi";
import FloatingButton from "../Shared/FloatingButton/FloatingButton";
import { Link } from "react-router-dom";

const IMAGE = "/images/220108background.png";
const ZECIC = "/images/zecnoleg1.png";
const ZECICLEG = "/images/zecleg1.png";

const HomePage = () => {
	const style = {
		backgroundImage: `url(${IMAGE})`,
	};

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
						Bojanka
					</h1>
				</div>
				<div className="loginformbody">
					<img className="image1" src={ZECIC} />
					<img className={`image2 ${change ? "leg" : " "}`} src={ZECICLEG} />
					<Link to="/game">
						<Button onHover={changeAnimate} text={"Započni"} />
					</Link>
				</div>
			</form>
			<Link to="/settings">
				<FloatingButton
					icon={<FiSettings size={30} className="floating-button-icon" />}
					style={{ top: "10px", right: "10px" }}
				/>
			</Link>
		</div>
	);
};

export default HomePage;
