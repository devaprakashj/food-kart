import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCYcSV96wrjwfv0of2XKnGuVKSdJjFixL8",
    authDomain: "food-kart---web.firebaseapp.com",
    projectId: "food-kart---web",
    storageBucket: "food-kart---web.firebasestorage.app",
    messagingSenderId: "185363598166",
    appId: "1:185363598166:web:44f099cbc649a69ec9a4f7",
    measurementId: "G-KSMK37V86N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, db, googleProvider, analytics };
