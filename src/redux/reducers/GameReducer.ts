import { ActionMap } from "../store";

const MAX_SCORE = 100;
const MIN_SCORE = 0;

//? State
export type GameState = {
	selectedId: number;
	score: number;
};
const initialState: GameState = {
	selectedId: 0,
	score: MIN_SCORE,
};

//? Action
export enum GameTypes {
	SelectedId = "GAME_ID",
	Score = "GAME_SCORE",
}
type GamePayload = {
	[GameTypes.SelectedId]: number;
	[GameTypes.Score]: number;
};
export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];

export const gameReducer = (state: GameState = initialState, action: GameActions) => {
	switch (action.type) {
		case GameTypes.SelectedId:
			return {
				...state,
				selectedId: action.payload,
			};
		case GameTypes.Score:
			return {
				...state,
				score: Math.max(Math.min(action.payload, MAX_SCORE), MIN_SCORE),
			};
		default:
			return state;
	}
};
