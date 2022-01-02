import { ActionMap } from "../store";

// NOTE: This is very hackyy... very very hackyyy

//? State
export type ActionsState = {
  clearCanvas: number;
};
const initialState: ActionsState = {
  clearCanvas: 0
};

//? Action
export enum ActionsTypes {
  ClearCanvas = "CLEAR_CANVAS",
}
type ActionsPayload = {
  [ActionsTypes.ClearCanvas]: never;
};
export type ActionsActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

export const actionsReducer = (
  state: ActionsState = initialState,
  action: ActionsActions
) => {
  switch (action.type) {
    case ActionsTypes.ClearCanvas:
      return {
        ...state,
        clearCanvas: state.clearCanvas + 1
      };
    default:
      return state;
  }
};
