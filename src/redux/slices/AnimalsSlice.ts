import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JSONStringList } from "../../util/misc";

//? State
export type Animal = {
	id: number;
	difficulty: number;
	colors: string[];
	category: string;
	name: JSONStringList;
	url: JSONStringList;
};
type AnimalsState = Animal[];
const initialState: AnimalsState = [];

const animalsSlice = createSlice({
	name: "animals",
	initialState,
	reducers: {
		addAnimal(state, action: PayloadAction<Animal>) {
			return [...state, action.payload];
		},
		updateAnimals(_state, action: PayloadAction<AnimalsState>) {
			return [...action.payload];
		},
		clearAnimals() {
			return [...initialState];
		},
	},
});

export const { addAnimal, updateAnimals, clearAnimals } = animalsSlice.actions;
export default animalsSlice.reducer;
