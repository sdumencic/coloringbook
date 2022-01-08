import { useDispatch, useSelector } from "react-redux";

import { BrushTypes } from "../../redux/reducers/BrushReducer";
import Canvas from "./Canvas/Canvas";
import { GlobalState } from "../../redux/store";
import HUD from "./HUD/HUD";
import { useParams } from "react-router";

const GamePage = () => {
	// Load information from the parameters
	const { id } = useParams(); // Fetch the picture id

	// Send global info
	const dispatch = useDispatch();

	// Load info from the global state
	const game = useSelector((state: GlobalState) => state.game);
	const brush = useSelector((state: GlobalState) => state.brush);

	// Check that everything is okie dokie
	if (!game.brushColors.includes(brush.color)) {
		dispatch({
			type: BrushTypes.Color,
			payload: game.brushColors[0],
		});
	}

	return (
		<>
			<Canvas />
			<HUD />
		</>
	);
};

export default GamePage;
