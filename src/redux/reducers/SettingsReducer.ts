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

//? State
export type SettingsState = {
	sound_volume: number;
	language: string;
};
const initialState: SettingsState = {
	sound_volume: sound_volume,
	language: language,
};

//? Actions
export enum SettingsTypes {
	SoundVolume = "SETTINGS_SOUND_VOLUME",
	Language = "SETTINGS_LANGUAGE",
}
type SettingsPayload = {
	[SettingsTypes.SoundVolume]: number;
	[SettingsTypes.Language]: "en" | "hr" | "de";
};
export type SettingsActions =
	ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const settingsReducer = (
	state: SettingsState = initialState,
	action: SettingsActions
) => {
	switch (action.type) {
		case SettingsTypes.SoundVolume:
			// NOTE: Ensure that the volume is between 0 and 100
			return {
				...state,
				sound_volume: Math.max(
					Math.min(action.payload, MAX_VOLUME),
					MIN_VOLUME
				),
			};
		case SettingsTypes.Language:
			return { ...state, language: action.payload };
		default:
			return state;
	}
};
