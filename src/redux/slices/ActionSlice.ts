import { createSlice } from "@reduxjs/toolkit";

//? State
type ActionsState = {
	clearCanvas: number;
	saveImage: number;
	locationCount: number;
};
const initialState: ActionsState = {
	clearCanvas: 0,
	saveImage: 0,
	locationCount: 0,
};

// NOTE: This is very hackyy... very very hackyyy
const actionsSlice = createSlice({
	name: "actions",
	initialState,
	reducers: {
		clearCanvas(state) {
			state.clearCanvas += 1;
		},
		saveImage(state) {
			state.saveImage += 1;
		},
		setLocationCount(state) {
			state.locationCount += 1;
		},
	},
});

export const { clearCanvas, saveImage, setLocationCount } = actionsSlice.actions;
export default actionsSlice.reducer;
