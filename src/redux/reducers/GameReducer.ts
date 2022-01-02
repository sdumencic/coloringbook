import { ActionMap } from "../store";

// TODO: Actually create this
//? State
export type GameState = {
  /**
   * Represents the available brush colors.
   */
  brushColors: (string | CanvasGradient | CanvasPattern)[];
};
const initialState: GameState = {
  // FIXME: This should be []
  brushColors: [
    "red",
    "green",
    "blue"
  ]
};

//? Action
export enum GameTypes {
  Weight = "BRUSH_WEIGHT",
  Color = "BRUSH_COLOR",
}
type GamePayload = {
  [GameTypes.Weight]: 0 | 1 | 2;
  [GameTypes.Color]: string | CanvasGradient | CanvasPattern;
};
export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];

export const gameReducer = (
  state: GameState = initialState,
  action: GameActions
) => {
  switch (action.type) {
    case GameTypes.Weight:
      return {
        ...state,
        weight: action.payload,
      };
    case GameTypes.Color:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
