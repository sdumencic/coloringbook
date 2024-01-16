import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const MAX_SCORE = 100;
const MIN_SCORE = 0;

//? State
type GameState = {
	selectedId: number;
	score: number;
};
const initialState: GameState = {
	selectedId: 0,
	score: MIN_SCORE,
};

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setSelectedGameId(state, action: PayloadAction<number>) {
			return {
				...state,
				selectedId: action.payload,
			};
		},
		scoreGame(state, action: PayloadAction<number>) {
			return {
				...state,
				score: Math.max(Math.min(action.payload, MAX_SCORE), MIN_SCORE),
			};
		},
	},
});

export const { setSelectedGameId, scoreGame } = gameSlice.actions;
export default gameSlice.reducer;
