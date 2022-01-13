import "./HUD.scss";

import { FcFullTrash, FcLeft } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

import { ActionsTypes } from "../../../redux/reducers/ActionReducer";
import { BrushTypes } from "../../../redux/reducers/BrushReducer";
import { Fragment } from "react";
import { GlobalState } from "../../../redux/store";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { ImUndo2 } from "react-icons/im";

const IMAGE1 = "/images/small.png";
const IMAGE2 = "/images/medium.png";
const IMAGE3 = "/images/big.png";

const HUD = () => {
	// Redux dispatcher
	const dispatch = useDispatch();

	// Load info from the global state
	const client = useSelector((state: GlobalState) => state.client);
	const selectedId = useSelector((state: GlobalState) => state.game.selectedId);
	const animals = useSelector((state: GlobalState) => state.animals);
	const brush = useSelector((state: GlobalState) => state.brush);

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
				<h2>Boja</h2>
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
			<div className="HUD" style={{ right: "10px", top: "120px" }}>
				<h2>Kist</h2>
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
			</div>
		);
	};

	return (
		<>
			{renderToolbar()}
			{renderColors()}
			{renderWidths()}
		</>
	);
};

export default HUD;
