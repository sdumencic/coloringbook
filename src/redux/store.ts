import { ClientState, clientReducer } from "./reducers/ClientReducer";
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
  client: ClientState;
};

export const rootReducer = combineReducers<GlobalState>({
  client: clientReducer,
});

export const store = createStore(
  rootReducer,
  // @ts-expect-error
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
