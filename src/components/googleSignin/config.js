import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
const firebaseConfig = {
	apiKey: "AIzaSyCPKws9k7A6dcT0J3lQbJDQ1r6j4TOVvac",
	authDomain: "carousel-eb2e7.firebaseapp.com",
	projectId: "carousel-eb2e7",
	storageBucket: "carousel-eb2e7.appspot.com",
	messagingSenderId: "709702808334",
	appId: "1:709702808334:web:7fe0ca4f9847ae75fc9d5f",
	measurementId: "G-87NCY8J6WP"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
export { auth, provider ,facebookProvider,twitterProvider};
