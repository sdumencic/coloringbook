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

export type GlobalState = unknown;

export const rootReducer = combineReducers<GlobalState>({});

export const store = createStore(rootReducer);

export default store;
