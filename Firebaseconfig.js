import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
const firebaseconfig = firebase.initializeApp(config);

export default firebaseconfig;