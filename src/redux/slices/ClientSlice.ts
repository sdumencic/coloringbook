import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//? State
type ClientState = {
	height: number;
	width: number;
};
const initialState: ClientState = {
	height: window.innerHeight,
	width: window.innerWidth,
};

const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {
		resizeClient(state, action: PayloadAction<ClientState>) {
			return {
				...state,
				height: action.payload.height,
				width: action.payload.width,
			};
		},
	},
});

export const { resizeClient } = clientSlice.actions;
export default clientSlice.reducer;
