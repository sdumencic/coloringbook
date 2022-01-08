import "./SettingsPage.scss";

import { FcSpeaker, FcUndo, FcVoicePresentation } from "react-icons/fc";

import Hud from "../Shared/FloatingButton/FloatingButton";
import { IoArrowUndo } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const BritishFlag = "images/BritishFlag.png";
const CroatianFlag = "images/CroatianFlag.png";
const GermanFlag = "images/GermanFlag.png";

const SettingsPage = () => {
	const [language, setLanguage] = useState("hr");

	const flagClicked = (country: string) => {
		if (country !== language) {
			//localStorage.setItem('language', country);
			//dispatch({ type: SettingsTypes.Language, payload: country });
		}
	};

	const sliderChange = (event: any) => {
		localStorage.setItem("duration", event.target.value);
		//dispatch({ type: SettingsTypes.AnimationDuration, payload: event.target.value });
	};

	return (
		<div className="settings">
			<h1>
				<FcSpeaker size={100} />
			</h1>
			<div className="animation">
				<input
					type="range"
					min="0.1"
					max="2"
					step="0.1"
					value="1"
					className="slider"
					onChange={sliderChange}
				/>
			</div>
			<h1>
				<FcVoicePresentation size={100} />
			</h1>
			<div className="flex">
				<div
					className={`item ${language !== "hr" ? "active" : ""}`}
					onClick={() => flagClicked("hr")}
				>
					<img src={CroatianFlag} />
				</div>
				<div
					className={`item ${language !== "en" ? "active" : ""}`}
					onClick={() => flagClicked("en")}
				>
					<img src={BritishFlag} />
				</div>
				<div
					className={`item ${language !== "de" ? "active" : ""}`}
					onClick={() => flagClicked("de")}
				>
					<img src={GermanFlag} />
				</div>
			</div>
			<Link to="/">
				<Hud
					icon={<FcUndo size={30} className="floating-button-icon" />}
					style={{ top: "10px", left: "10px" }}
				/>
			</Link>
		</div>
	);
};

export default SettingsPage;
