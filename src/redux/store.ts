import actionsReducer from "./slices/ActionSlice";
import animalsReducer from "./slices/AnimalsSlice";
import brushReducer from "./slices/BrushSlice";
import clientReducer from "./slices/ClientSlice";
import gameReducer from "./slices/GameSlice";
import settingsReducer from "./slices/SettingsSlice";

import isDevelopment from "../util/isDevelopment";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		actions: actionsReducer,
		animals: animalsReducer,
		brush: brushReducer,
		client: clientReducer,
		game: gameReducer,
		settings: settingsReducer,
	},
	devTools: isDevelopment(),
});

export default store;
export type GlobalState = ReturnType<typeof store.getState>;
