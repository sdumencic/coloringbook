import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "",

	authDomain: "",

	projectId: "",

	storageBucket: "",

	messagingSenderId: "",

	appId: "",
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };
