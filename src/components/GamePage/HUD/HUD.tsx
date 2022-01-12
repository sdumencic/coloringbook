import "./HUD.scss";

import { useDispatch, useSelector } from "react-redux";

import { ActionsTypes } from "../../../redux/reducers/ActionReducer";
import { BrushTypes } from "../../../redux/reducers/BrushReducer";
import { Fragment } from "react";
import { GlobalState } from "../../../redux/store";
import { Link } from "react-router-dom";

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
			<div className="HUD" style={{ left: "10px", top: "calc(80px + 5vw)" }}>
				<h2>Boja</h2>
				{colors}
			</div>
		);
	};

	const renderWidths = () => {
		const widthNames = ["M", "S", "V"];
		const widths = widthNames.map((width, index) => (
			<Fragment key={`brushWidths-${width}-${index}`}>
				<button
					type="button"
					className={`back ${brush.width === index ? "selected" : ""}`}
					onClick={() => setWidth(index)}
				>
					{width}
				</button>
				<br />
			</Fragment>
		));

		return (
			<div className="HUD" style={{ right: "10px", top: "120px" }}>
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
				<Link to="/">
					<button type="button" className="back">
						◀
					</button>
				</Link>
				<button type="button" onClick={clearCanvas} className="delete">
					♻
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
