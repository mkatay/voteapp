// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {firebaseConfig} from './firebaseConfig'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)