import "./SettingsPage.scss";

import { FcSpeaker, FcUndo, FcVoicePresentation } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

import { BsBrush } from "react-icons/bs";
import { ChangeEvent } from "react";
import FloatingButton from "../Shared/FloatingButton/FloatingButton";
import { GlobalState } from "../../redux/store";
import { HiOutlineCursorClick } from "react-icons/hi";
import { SettingsTypes } from "../../redux/reducers/SettingsReducer";
import Switch from "./Switch/Switch";
import { strings } from "../../util/language";
import { useNavigate } from "react-router-dom";

const BritishFlag = "images/BritishFlag.png";
const CroatianFlag = "images/CroatianFlag.png";
const GermanFlag = "images/GermanFlag.png";

const SettingsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { sound_volume, language, draw_mode } = useSelector((state: GlobalState) => state.settings);
	const locationCount = useSelector((state: GlobalState) => state.actions.locationCount);

	const flagClicked = (country: string) => {
		if (country !== language) {
			dispatch({ type: SettingsTypes.Language, payload: country });
		}
	};

	const volumeChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: SettingsTypes.SoundVolume, payload: event.target.value });
	};

	const drawModeChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: SettingsTypes.DrawMode, payload: event.target.checked ? "hold" : "toggle" });
	};

	return (
		<div className="settings">
			<h2>{strings[language].settingsPage.mode}</h2>
			<Switch
				checked={draw_mode === "hold"}
				onChange={drawModeChange}
				leftIcon={<HiOutlineCursorClick size={30} />}
				rightIcon={<BsBrush size={30} />}
			/>

			<h1>
				<FcSpeaker size={70} />
			</h1>

			<div className="animation">
				<input
					type="range"
					min="0"
					max="100"
					step="1"
					value={sound_volume}
					className="slider"
					onChange={volumeChange}
				/>
			</div>

			<h1>
				<FcVoicePresentation size={70} />
			</h1>

			<div className="flex">
				<div className={`item ${language !== "hr" ? "" : "active"}`} onClick={() => flagClicked("hr")}>
					<img src={CroatianFlag} alt={strings[language].settingsPage.hr} />
					<h2>{strings[language].settingsPage.hr}</h2>
				</div>
				<div className={`item ${language !== "en" ? "" : "active"}`} onClick={() => flagClicked("en")}>
					<img src={BritishFlag} alt={strings[language].settingsPage.en} />
					<h2>{strings[language].settingsPage.en}</h2>
				</div>
				<div className={`item ${language !== "de" ? "" : "active"}`} onClick={() => flagClicked("de")}>
					<img src={GermanFlag} alt={strings[language].settingsPage.de} />
					<h2>{strings[language].settingsPage.de}</h2>
				</div>
			</div>

			<FloatingButton
				icon={<FcUndo size={30} className="floating-button-icon" />}
				style={{ top: "10px", left: "10px" }}
				onClick={() => (locationCount <= 1 ? navigate("/") : navigate(-1))}
			/>
		</div>
	);
};

export default SettingsPage;
