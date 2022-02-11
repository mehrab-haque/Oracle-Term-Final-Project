// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAAgwx9yGwzvh33P0YQlqJ5Jx4W4SUsa9w",
    authDomain: "messengor-7f655.firebaseapp.com",
    projectId: "messengor-7f655",
    storageBucket: "messengor-7f655.appspot.com",
    messagingSenderId: "446641388338",
    appId: "1:446641388338:web:0714615636c5affc8eb52b",
    measurementId: "G-V24TMTKV6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}
