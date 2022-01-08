import "./GameSelectPage.scss";

import { FcSpeaker, FcUndo, FcVoicePresentation } from "react-icons/fc";
import { MouseEvent, useEffect, useRef, useState } from "react";

import Hud from "../Shared/Hud/Hud";
import Images from "./Images/Images";
import { Link } from "react-router-dom";

const GameSelectPage = () => {
	const [animals, setAnimals] = useState("All");
	const [active, setActive] = useState(0);

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
		<div>
			<div className="loginBackground">
				<form className="loginform">
					<div className="loginformheader">
						<div className="buttons">
							<div
								className={`button ${active == 0 ? "active" : ""}`}
								onClick={changeToAll}
							>
								Sve životinje
							</div>
							<div
								className={`button ${active == 1 ? "active" : ""}`}
								onClick={changeToDomestic}
							>
								Domaće životinje
							</div>
							<div
								className={`button ${active == 2 ? "active" : ""}`}
								onClick={changeToWild}
							>
								{" "}
								{/* "register-to-right" : "register-to-left" */}
								Divlje životinje
							</div>
						</div>
					</div>
					{active == 0 ? <Images /> : ""}
				</form>
			</div>
			<Link to="/">
				<Hud icon={<FcUndo size={30} className="hud-icon" />} />
			</Link>
		</div>
	);
};

export default GameSelectPage;
