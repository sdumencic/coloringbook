import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { BrushTypes } from "../../redux/reducers/BrushReducer";
import Canvas from "./Canvas/Canvas";
import { GameTypes } from "../../redux/reducers/GameReducer";
import { GlobalState } from "../../redux/store";
import HUD from "./HUD/HUD";
import { useEffect } from "react";

const GamePage = () => {
	// Hooks
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Load information from the parameters
	const { id } = useParams(); // Fetch the picture id
	const numId = isNaN(Number(id)) ? 0 : Number(id);

	// Load info from the global state
	const game = useSelector((state: GlobalState) => state.game);
	const brush = useSelector((state: GlobalState) => state.brush);
	const animals = useSelector((state: GlobalState) => state.animals);
	const language = useSelector((state: GlobalState) => state.settings.language);

	useEffect(() => {
		// Animals are not loaded, go to the selection screen
		if (numId >= animals.length) {
			navigate("/game");
		}
	}, []);

	// NOTE: We need to do this both in useEffect and in render since useEffect is running
	// while rendering.
	if (numId >= animals.length) {
		return null;
	}

	if (game.selectedId !== numId) {
		dispatch({
			type: GameTypes.SelectedId,
			payload: numId,
		});
		dispatch({
			type: GameTypes.Score,
			payload: 0,
		});
	}

	// Check that brush is ok
	if (!animals[numId].colors.includes(brush.color)) {
		dispatch({
			type: BrushTypes.Color,
			payload: animals[numId].colors[0],
		});
	}

	return (
		<>
			<Canvas
				maskImageURL={animals[numId].url.mask}
				outlineImageURL={animals[numId].url.outline}
				bigImageURL={animals[numId].url.big}
				name={animals[numId].name[language]}
			/>

			<HUD />
		</>
	);
};

export default GamePage;
