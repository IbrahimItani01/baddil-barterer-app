// config the firebase frontend side to handle google token generation:
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
