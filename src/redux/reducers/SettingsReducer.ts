import { ActionMap } from "../store";

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
};
const initialState: SettingsState = {
	sound_volume: sound_volume,
	language: language,
	draw_mode: draw_mode,
};

//? Actions
export enum SettingsTypes {
	SoundVolume = "SETTINGS_SOUND_VOLUME",
	Language = "SETTINGS_LANGUAGE",
	DrawMode = "SETTINGS_DRAW_MODE",
}
type SettingsPayload = {
	[SettingsTypes.SoundVolume]: number;
	[SettingsTypes.Language]: "en" | "hr" | "de";
	[SettingsTypes.DrawMode]: "toggle" | "hold";
};
export type SettingsActions =
	ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const settingsReducer = (
	state: SettingsState = initialState,
	action: SettingsActions
) => {
	switch (action.type) {
		case SettingsTypes.SoundVolume: {
			// NOTE: Ensure that the volume is between 0 and 100
			const volume = Math.max(Math.min(action.payload, MAX_VOLUME), MIN_VOLUME);
			localStorage.setItem("sound_volume", String(volume));
			return {
				...state,
				sound_volume: volume,
			};
		}
		case SettingsTypes.Language: {
			localStorage.setItem("language", action.payload);
			return { ...state, language: action.payload };
		}
		case SettingsTypes.DrawMode: {
			localStorage.setItem("draw_mode", action.payload);
			return { ...state, draw_mode: action.payload };
		}
		default:
			return state;
	}
};
