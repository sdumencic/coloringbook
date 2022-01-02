import { ActionsState, actionsReducer } from "./reducers/ActionReducer";
import { BrushState, brushReducer } from "./reducers/BrushReducer";
import { ClientState, clientReducer } from "./reducers/ClientReducer";
import { GameState, gameReducer } from "./reducers/GameReducer";
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
  brush: BrushState;
  client: ClientState;
  game: GameState;
};

export const rootReducer = combineReducers<GlobalState>({
  actions: actionsReducer,
  brush: brushReducer,
  client: clientReducer,
  game: gameReducer,
});

export const store = createStore(
  rootReducer,
  // TODO: Remove this :)
  // @ts-expect-error
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
