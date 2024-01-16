import { child, get } from "firebase/database";

import { updateAnimals } from "../redux/slices/AnimalsSlice";
import { projectDatabase } from "./config";
import store from "../redux/store";

/** Load the problems from the database */
export const loadAnimals = async () => {
	const { animals } = store.getState();

	if (!(Array.isArray(animals) && animals.length)) {
		// Get data from the Database
		get(child(projectDatabase, "animals"))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					store.dispatch(updateAnimals(data));
				} else {
					console.error("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
};
