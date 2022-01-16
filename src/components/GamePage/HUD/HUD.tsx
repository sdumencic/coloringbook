import "./HUD.scss";

import { useDispatch, useSelector } from "react-redux";

import { ActionsTypes } from "../../../redux/reducers/ActionReducer";
import { AiOutlineSave } from "react-icons/ai";
import { BrushTypes } from "../../../redux/reducers/BrushReducer";
import { BsTrash } from "react-icons/bs";
import { Fragment } from "react";
import { GlobalState } from "../../../redux/store";
import { ImUndo2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { strings } from "../../../util/language";

const IMAGE1 = "/images/small.png";
const IMAGE2 = "/images/medium.png";
const IMAGE3 = "/images/big.png";

const HUD = () => {
	// Redux dispatcher
	const dispatch = useDispatch();

	// Load info from the global state
	const selectedId = useSelector((state: GlobalState) => state.game.selectedId);
	const animals = useSelector((state: GlobalState) => state.animals);
	const brush = useSelector((state: GlobalState) => state.brush);
	const language = useSelector((state: GlobalState) => state.settings.language);

	/**
	 * Set the color from the brush pallete :)
	 * @param index Index of the brush from the brush pallete
	 */
	const setColor = (index: number) => {
		dispatch({
			type: BrushTypes.Color,
			payload: animals[selectedId].colors[index],
		});
	};

	/**
	 *
	 * @param size Careful it must be 0-2
	 */
	const setWidth = (size: number) => {
		dispatch({
			type: BrushTypes.Width,
			payload: size,
		});
	};

	const clearCanvas = () => {
		dispatch({
			type: ActionsTypes.ClearCanvas,
		});
	};

	const saveImage = () => {
		dispatch({
			type: ActionsTypes.SaveImage,
		});
	};

	const renderColors = () => {
		const colors = animals[selectedId].colors.map((color, index) => (
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
		const widthNames = [IMAGE1, IMAGE2, IMAGE3];
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
			</div>
		);
	};

	const renderPreview = () => {
		return (
			<div className="HUD" style={{ top: "10px", right: "10px" }}>
				<h2 className="slim">{animals[selectedId].name[language]}</h2>
				<img className="preview" src={animals[selectedId].url.small}></img>
			</div>
		);
	};

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
