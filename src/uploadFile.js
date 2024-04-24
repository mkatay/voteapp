import { storage } from "./firebaseApp";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4} from 'uuid';

export const uploadFile = async (file) => {
  console.log(file);
  try {
    console.log(`projects/${v4()+file.name.slice(-4)}`)
    
    const fileRef = ref(storage, `projects/${v4()+file.name.slice(-4)}`);
    await uploadBytes(fileRef, file);
    const photoUrl = await getDownloadURL(fileRef);
    return photoUrl;
    return null
  } catch (err) {
    console.log("Hiba a fájlfeltöltés során:", err);
    throw err;
  }
};

