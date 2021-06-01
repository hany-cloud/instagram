import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { seedDatabase } from '../seed';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Pg9VtoKIj7hO-Op4bKzBJb5jWEQHeoU",
  authDomain: "instagram-yt-238a6.firebaseapp.com",
  projectId: "instagram-yt-238a6",
  storageBucket: "instagram-yt-238a6.appspot.com",
  messagingSenderId: "65524130370",
  appId: "1:65524130370:web:eeddd3d9b7e8baea1a43db"
};
// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);

const { FieldValue } =  Firebase.firestore;

// Call seed file (!only once!)
//seedDatabase(firebase);

export { firebase, FieldValue };