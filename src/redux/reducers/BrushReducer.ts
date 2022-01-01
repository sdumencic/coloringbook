import { ActionMap } from "../store";

//? State
export type BrushState = {
  /**
   * Represents the size of the brush:
   *
   * 0 - Small; 1 - Normal; 2 - Large
   */
  weight: 0 | 1 | 2;
  /**
   * Represents the color of the brush.
   * Can be an RGB string, canvas gradient or pattern.
   */
  color: string | CanvasGradient | CanvasPattern;
};
const initialState: BrushState = {
  weight: 2,
  color: "white",
};

//? Action
export enum BrushTypes {
  Weight = "BRUSH_WEIGHT",
  Color = "BRUSH_COLOR",
}
type BrushPayload = {
  [BrushTypes.Weight]: 0 | 1 | 2;
  [BrushTypes.Color]: string | CanvasGradient | CanvasPattern;
};
export type BrushActions = ActionMap<BrushPayload>[keyof ActionMap<BrushPayload>];

export const brushReducer = (
  state: BrushState = initialState,
  action: BrushActions
) => {
  switch (action.type) {
    case BrushTypes.Weight:
      return {
        ...state,
        weight: action.payload,
      };
    case BrushTypes.Color:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
