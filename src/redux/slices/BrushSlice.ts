import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//? State
type BrushState = {
	/**
	 * Represents the size of the brush:
	 *
	 * 0 - Small; 1 - Normal; 2 - Large
	 */
	width: 0 | 1 | 2;
	/**
	 * Represents the color of the brush.
	 * Can be an RGB string, canvas gradient or pattern.
	 */
	color: string;
};
const initialState: BrushState = {
	width: 1,
	color: "white",
};

const brushSlice = createSlice({
	name: "brush",
	initialState,
	reducers: {
		setBrushWidth(state, action: PayloadAction<BrushState["width"]>) {
			return {
				...state,
				width: action.payload,
			};
		},
		setBrushColor(state, action: PayloadAction<string>) {
			return {
				...state,
				color: action.payload,
			};
		},
	},
});

export const { setBrushWidth, setBrushColor } = brushSlice.actions;
export default brushSlice.reducer;
