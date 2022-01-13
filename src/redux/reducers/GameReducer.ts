import { ActionMap } from "../store";

// TODO: Actually create this
//? State
export type GameState = {
	selectedId: number;
};
const initialState: GameState = {
	selectedId: 0,
};

//? Action
export enum GameTypes {
	SelectedId = "GAME_ID",
}
type GamePayload = {
	[GameTypes.SelectedId]: number;
};
export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];

export const gameReducer = (
	state: GameState = initialState,
	action: GameActions
) => {
	switch (action.type) {
		case GameTypes.SelectedId:
			return {
				...state,
				selectedId: action.payload,
			};
		default:
			return state;
	}
};
