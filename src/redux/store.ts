import { ActionsState, actionsReducer } from "./reducers/ActionReducer";
import { AnimalsState, animalsReducer } from "./reducers/AnimalsReducer";
import { BrushState, brushReducer } from "./reducers/BrushReducer";
import { ClientState, clientReducer } from "./reducers/ClientReducer";
import { GameState, gameReducer } from "./reducers/GameReducer";
import { SettingsState, settingsReducer } from "./reducers/SettingsReducer";
import { combineReducers, createStore } from "redux";

/**
 * Allows us to gently map enum with types and enum with payloads into action object
 */
export type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload: M[Key];
		  };
};

export type GlobalState = {
	actions: ActionsState;
	animals: AnimalsState;
	brush: BrushState;
	client: ClientState;
	game: GameState;
	settings: SettingsState;
};

export const rootReducer = combineReducers<GlobalState>({
	actions: actionsReducer,
	animals: animalsReducer,
	brush: brushReducer,
	client: clientReducer,
	game: gameReducer,
	settings: settingsReducer,
});

export const store = createStore(
	rootReducer,
	// TODO: Make this only for the DEV environment not prod
	// @ts-expect-error Because this is not a typesafe way to include devtools
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
