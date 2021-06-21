import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAvIfMSR8I6TuRH7hH1vUjngVn2SrQ6PqY",
    authDomain: "letmeask-1af60.firebaseapp.com",
    databaseURL: "https://letmeask-1af60-default-rtdb.firebaseio.com",
    projectId: "letmeask-1af60",
    storageBucket: "letmeask-1af60.appspot.com",
    messagingSenderId: "830779395926",
    appId: "1:830779395926:web:3174e4470172c6c37090f7"
};

firebase.initializeApp(firebaseConfig); 

export const auth = firebase.auth();
export const database = firebase.database();