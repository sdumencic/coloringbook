import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UAParser } from "ua-parser-js";

const parser = new UAParser(window.navigator.userAgent);
const parserResults = parser.getResult();
const isFirefox = parserResults.browser.name === "Firefox";

const MAX_VOLUME = 100;
const MIN_VOLUME = 0;

let language = "hr";
if (localStorage.getItem("language")) {
	language = localStorage.getItem("language") as string;
}
let sound_volume = 100;
if (localStorage.getItem("volume")) {
	sound_volume = Number(localStorage.getItem("sound_volume") as string);
}
let draw_mode = "toggle";
if (localStorage.getItem("draw_mode")) {
	draw_mode = localStorage.getItem("draw_mode") as string;
}

//? State
export type SettingsState = {
	sound_volume: number;
	language: string;
	draw_mode: string;
	isFirefox: boolean;
};
const initialState: SettingsState = {
	sound_volume: sound_volume,
	language: language,
	draw_mode: draw_mode,
	isFirefox: isFirefox,
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setSoundVolume(state, action: PayloadAction<number>) {
			// NOTE: Ensure that the volume is between 0 and 100
			const volume = Math.max(Math.min(action.payload, MAX_VOLUME), MIN_VOLUME);
			localStorage.setItem("sound_volume", String(volume));
			return {
				...state,
				sound_volume: volume,
			};
		},
		setLanguage(state, action: PayloadAction<"en" | "hr" | "de">) {
			localStorage.setItem("language", action.payload);
			return { ...state, language: action.payload };
		},
		setDrawMode(state, action: PayloadAction<"toggle" | "hold">) {
			localStorage.setItem("draw_mode", action.payload);
			return { ...state, draw_mode: action.payload };
		},
	},
});

export const { setSoundVolume, setLanguage, setDrawMode } = settingsSlice.actions;
export default settingsSlice.reducer;
