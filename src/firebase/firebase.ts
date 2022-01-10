import { child, get } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { projectDatabase, projectStorage } from "./config";

import { AnimalsTypes } from "../redux/reducers/AnimalsReducer";
import { store } from "../redux/store";

/** Load the problems from the database */
export const loadAnimals = async () => {
	const { animals } = store.getState();

	if (!(Array.isArray(animals) && animals.length)) {
		// Get data from the Database
		get(child(projectDatabase, "animals"))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					store.dispatch({ type: AnimalsTypes.Update, payload: data });
				} else {
					console.error("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
};

type ImageType = "color" | "mask" | "outline" | "small";

export const getImageURL = async (
	type: ImageType,
	name: string
): Promise<string> => {
	// Create a reference to the file we want to download
	const starsRef = storageRef(projectStorage, `${type}/${name}_${type}.png`);

	// Get the download URL
	return getDownloadURL(starsRef)
		.then((url) => {
			// Insert url into an <img> tag to "download"
			console.log(url);
			return url;
		})
		.catch((error) => {
			//console.error(error);
			return "";
		});
};
