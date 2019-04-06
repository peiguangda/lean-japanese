import * as firebase from "firebase/app";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyCrvGDQb8FWqidmp1Ylw0IhdJJgTrLKu54",
    authDomain: "easy-japanese-154d1.firebaseapp.com",
    databaseURL: "https://easy-japanese-154d1.firebaseio.com",
    projectId: "easy-japanese-154d1",
    storageBucket: "easy-japanese-154d1.appspot.com",
    messagingSenderId: "989964683938"
};

firebase.initializeApp(config);
const storage = firebase.storage();

export {
    storage, firebase
}
