import { ActionMap } from "../store";

//? State
export type BrushState = {
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

//? Action
export enum BrushTypes {
	Width = "BRUSH_WIDTH",
	Color = "BRUSH_COLOR",
}
type BrushPayload = {
	[BrushTypes.Width]: 0 | 1 | 2;
	[BrushTypes.Color]: string;
};
export type BrushActions = ActionMap<BrushPayload>[keyof ActionMap<BrushPayload>];

export const brushReducer = (state: BrushState = initialState, action: BrushActions) => {
	switch (action.type) {
		case BrushTypes.Width:
			return {
				...state,
				width: action.payload,
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
