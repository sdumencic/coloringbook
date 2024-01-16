import "./HUD.scss";

import { CSSProperties, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearCanvas as _clearCanvas, saveImage as _saveImage } from "../../../redux/slices/ActionSlice";
import { AiOutlineSave } from "react-icons/ai";
import { setBrushColor, setBrushWidth } from "../../../redux/slices/BrushSlice";
import { BsTrash } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import { FcUndo } from "react-icons/fc";
import { Fireworks } from "@fireworks-js/react";
import FloatingButton from "../../Shared/FloatingButton/FloatingButton";
import { GlobalState } from "../../../redux/store";
import { ImUndo2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { strings } from "../../../util/language";

const SMALL_BRUSH = "/images/small.png";
const MEDIUM_BRUSH = "/images/medium.png";
const LARGE_BRUSH = "/images/big.png";

const BRONZE_MEDAL = "/images/bronce.png";
const SILVER_MEDAL = "/images/silver.png";
const GOLD_MEDAL = "/images/gold.png";

const HUD = () => {
	// Redux dispatcher
	const dispatch = useDispatch();

	// Load info from the global state
	const game = useSelector((state: GlobalState) => state.game);
	const animals = useSelector((state: GlobalState) => state.animals);
	const brush = useSelector((state: GlobalState) => state.brush);
	const language = useSelector((state: GlobalState) => state.settings.language);
	const sound_volume = useSelector((state: GlobalState) => state.settings.sound_volume);
	const client = useSelector((state: GlobalState) => state.client);

	// SECTION: Local state
	const [showMedal, setShowMedal] = useState(false);

	const fireworksOptions = {
		speed: 5,
		acceleration: 1.0,
		friction: 0.95,
		particles: 500,
		delay: { min: 10, max: 25 },
		hue: { min: 0, max: game.score >= 85 ? 360 : game.score >= 65 ? 180 : 0 },
		sound: {
			enabled: true,
			files: [
				"https://fireworks.js.org/sounds/explosion0.mp3",
				"https://fireworks.js.org/sounds/explosion1.mp3",
				"https://fireworks.js.org/sounds/explosion2.mp3",
			],
			volume: {
				min: (1 * sound_volume) / 100,
				max: (2 * sound_volume) / 100,
			},
		},
	};

	const fireworksStyle: CSSProperties = {
		position: "fixed",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
		pointerEvents: "none",
	};

	/**
	 * Set the color from the brush pallete :)
	 * @param index Index of the brush from the brush pallete
	 */
	const setColor = (index: number) => {
		dispatch(setBrushColor(animals[game.selectedId].colors[index]));
	};

	/**
	 *
	 * @param size Careful it must be 0-2
	 */
	const setWidth = (size: number) => {
		if (size >= 0 && size <= 2) {
			dispatch(setBrushWidth(size as 0 | 1 | 2));
		}
	};

	const clearCanvas = () => {
		dispatch(_clearCanvas());
	};

	const saveImage = () => {
		dispatch(_saveImage());
	};

	const renderColors = () => {
		const colors = animals[game.selectedId].colors.map((color, index) => (
			<Fragment key={`brushColors-${color}-${index}`}>
				<button
					type="button"
					className={brush.color === color ? "selected" : ""}
					style={{ backgroundColor: `${color}` }}
					onClick={() => setColor(index)}
				></button>
				<br />
			</Fragment>
		));

		return (
			// TODO: Make these styles responsive
			<div className="HUD" style={{ left: "10px", top: "120px" }}>
				<h2>{strings[language].hud.color}</h2>
				{colors}
			</div>
		);
	};

	const renderWidths = () => {
		const widthNames = [SMALL_BRUSH, MEDIUM_BRUSH, LARGE_BRUSH];
		const widths = widthNames.map((width, index) => (
			<Fragment key={`brushWidths-${width}-${index}`}>
				<button
					type="button"
					className={`back ${brush.width === index ? "selected" : ""}`}
					onClick={() => setWidth(index)}
				>
					<img className="width-img" src={width} />
				</button>
				<br />
			</Fragment>
		));

		return (
			<div className="HUD" style={{ right: "10px", top: "310px" }}>
				<h2>{strings[language].hud.brush}</h2>
				{widths}
			</div>
		);
	};

	/**
	 * Renders top of the screen toolbar with back button and other actions
	 * @returns Top Toolbar JSX Element
	 */
	const renderToolbar = () => {
		const medalStyle = game.score >= 85 ? "gold" : game.score >= 65 ? "silver" : "bronze";
		const renderMedalButton = game.score >= 40;

		return (
			<div className="HUD" style={{ left: "10px" }}>
				<Link to="/game">
					<button type="button" className="back">
						<ImUndo2 size={30} />
					</button>
				</Link>
				<button type="button" onClick={clearCanvas} className="delete">
					<BsTrash size={30} />
				</button>
				<button type="button" onClick={saveImage} className="save">
					<AiOutlineSave size={30} />
				</button>
				{renderMedalButton && (
					<button type="button" onClick={() => setShowMedal(true)} className={medalStyle}>
						<FaMedal size={30} />
					</button>
				)}
			</div>
		);
	};

	const renderPreview = () => {
		return (
			<div className="HUD" style={{ top: "10px", right: "10px" }}>
				<h2 className="slim">{animals[game.selectedId].name[language]}</h2>
				<img className="preview" src={animals[game.selectedId].url.small}></img>
			</div>
		);
	};

	const renderPopup = () => {
		const border = 20;
		const width = 200;
		const height = 270;
		const top = (client.height - height - border) / 2;
		const right = (client.width - width - border) / 2;
		const medalStyle = game.score >= 85 ? "gold" : game.score >= 65 ? "silver" : "bronze";
		const medalImage = game.score >= 85 ? GOLD_MEDAL : game.score >= 65 ? SILVER_MEDAL : BRONZE_MEDAL;

		return (
			<>
				<div className="blocker" onClick={() => setShowMedal(false)}></div>
				<div
					className="HUD"
					style={{ width: `${width}px`, height: `${height}px`, top: `${top}px`, right: `${right}px` }}
				>
					<h2 className="slim">{strings[language].misc.congrats}</h2>
					<img className={`medal ${medalStyle}`} src={medalImage}></img>
				</div>
				<FloatingButton
					icon={<FcUndo size={30} className="floating-button-icon" />}
					style={{ top: "10px", left: "10px" }}
					onClick={() => setShowMedal(false)}
				/>
			</>
		);
	};

	if (showMedal) {
		return (
			<>
				{renderPopup()}
				<Fireworks style={fireworksStyle} options={fireworksOptions} />
			</>
		);
	}

	return (
		<>
			{renderToolbar()}
			{renderColors()}
			{renderWidths()}
			{renderPreview()}
		</>
	);
};

export default HUD;
