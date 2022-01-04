// NOTE: You will have to rename this to config.js and provide valid firebase credentials
import 'firebase/storage';
import 'firebase/firestore';

import * as firebase from 'firebase/app';

const firebaseConfig = {

    apiKey: "",

    authDomain: "",

    projectId: "",

    storageBucket: "",

    messagingSenderId: "",

    appId: ""

};


firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };