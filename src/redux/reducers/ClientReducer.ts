import { ActionMap } from "../store";

//? State
export type ClientState = {
	height: number;
	width: number;
};
const initialState: ClientState = {
	height: window.innerHeight,
	width: window.innerWidth,
};

//? Action
export enum ClientTypes {
	Resize = "CLIENT_RESIZE",
}
type ClientPayload = {
	[ClientTypes.Resize]: ClientState;
};
export type ClientActions =
	ActionMap<ClientPayload>[keyof ActionMap<ClientPayload>];

export const clientReducer = (
	state: ClientState = initialState,
	action: ClientActions
) => {
	switch (action.type) {
		case ClientTypes.Resize:
			return {
				...state,
				height: action.payload.height,
				width: action.payload.width,
			};
		default:
			return state;
	}
};
