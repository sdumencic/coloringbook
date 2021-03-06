import { ActionMap } from "../store";

// NOTE: This is very hackyy... very very hackyyy

//? State
export type ActionsState = {
	clearCanvas: number;
	saveImage: number;
	locationCount: number;
};
const initialState: ActionsState = {
	clearCanvas: 0,
	saveImage: 0,
	locationCount: 0,
};

//? Action
export enum ActionsTypes {
	ClearCanvas = "CLEAR_CANVAS",
	SaveImage = "SAVE_IMAGE",
	LocationCount = "LOCATION_COUNT",
}
type ActionsPayload = {
	[ActionsTypes.ClearCanvas]: never;
	[ActionsTypes.LocationCount]: never;
	[ActionsTypes.SaveImage]: never;
};
export type ActionsActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

export const actionsReducer = (state: ActionsState = initialState, action: ActionsActions) => {
	switch (action.type) {
		case ActionsTypes.ClearCanvas:
			return {
				...state,
				clearCanvas: state.clearCanvas + 1,
			};
		case ActionsTypes.SaveImage:
			return {
				...state,
				saveImage: state.saveImage + 1,
			};
		case ActionsTypes.LocationCount:
			return {
				...state,
				locationCount: state.locationCount + 1,
			};
		default:
			return state;
	}
};
