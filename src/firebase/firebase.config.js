import { getAuth } from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
// For Realtime Database
import { getDatabase } from "firebase/database"; 
// For Firestore (alternative)
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHGcDAGp-RG-KBfFPn7Hk5iRCDMDRgmUs",
  authDomain: "mentor-sasnaka.firebaseapp.com",
  projectId: "mentor-sasnaka",
  storageBucket: "mentor-sasnaka.firebasestorage.app",
  messagingSenderId: "657020520208",
  appId: "1:657020520208:web:5dc7ce50e92a9242500795",
  databaseURL: "https://mentor-sasnaka-default-rtdb.firebaseio.com/" // Only for Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// Export database instance
export const database = getDatabase(app); // Use for Realtime Database
export const firestore = getFirestore(app); // Use for Firestore if needed