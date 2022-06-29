import * as firebase from "firebase/app";

import { ref as databaseRef, getDatabase } from "firebase/database";

import { getStorage } from "firebase/storage";

// NOTE: Put in the correct API key etc. and rename this file to config.js
const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
};

firebase.initializeApp(firebaseConfig);

export const projectDatabase = databaseRef(getDatabase());
export const projectStorage = getStorage();
