import "./GameSelectPage.scss";

import { FcSpeaker, FcUndo, FcVoicePresentation } from "react-icons/fc";
import { MouseEvent, useEffect, useRef, useState } from "react";

import { FiSettings } from "react-icons/fi";
import FloatingButton from "../Shared/FloatingButton/FloatingButton";
import { GlobalState } from "../../redux/store";
import Images from "./Images/Images";
import { Link } from "react-router-dom";
import { strings } from "../../util/language";
import { useSelector } from "react-redux";

const GameSelectPage = () => {
	const [animals, setAnimals] = useState("All");
	const [active, setActive] = useState(0);
	const { language } = useSelector((state: GlobalState) => state.settings);

	const changeToAll = () => {
		setAnimals("All");
		setActive(0);
	};

	const changeToDomestic = () => {
		setAnimals("Domestic");
		setActive(1);
	};

	const changeToWild = () => {
		setAnimals("Wild");
		setActive(2);
	};

	return (
		<div className="selectBackground">
			<form className="imgContainer">
				<div className="loginformheader">
					<div className="buttons">
						<div
							className={`button ${active == 0 ? "active" : ""}`}
							onClick={changeToAll}
						>
							{strings[language].gameSelectPage.allAnimals}
						</div>
						<div
							className={`button ${active == 1 ? "active" : ""}`}
							onClick={changeToDomestic}
						>
							{strings[language].gameSelectPage.domesticAnimals}
						</div>
						<div
							className={`button ${active == 2 ? "active" : ""}`}
							onClick={changeToWild}
						>
							{" "}
							{/* "register-to-right" : "register-to-left" */}
							{strings[language].gameSelectPage.wildAnimals}
						</div>
					</div>
				</div>
				{active == 0 ? <Images /> : ""}
			</form>
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

export default GameSelectPage;
