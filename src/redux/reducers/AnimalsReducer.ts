import { ActionMap } from "../store";
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

export type AnimalsState = Animal[];
const initialState: AnimalsState = [];

//? Action
export enum AnimalsTypes {
	Add = "ANIMALS_ADD",
	Clear = "ANIMALS_CLEAR",
	Update = "ANIMALS_UPDATE",
}
type AnimalsPayload = {
	[AnimalsTypes.Add]: Animal;
	[AnimalsTypes.Update]: AnimalsState;
	[AnimalsTypes.Clear]: never;
};
export type AnimalsActions =
	ActionMap<AnimalsPayload>[keyof ActionMap<AnimalsPayload>];

//? Reducer
export const animalsReducer = (
	state: AnimalsState = initialState,
	action: AnimalsActions
) => {
	switch (action.type) {
		case AnimalsTypes.Add:
			return [...state, action.payload];
		case AnimalsTypes.Update:
			return action.payload;
		case AnimalsTypes.Clear:
			return initialState;
		default:
			return state;
	}
};
