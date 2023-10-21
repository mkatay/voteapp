//a backend kölünválasztva
import {db} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,arrayUnion,
  where,getDocs,serverTimestamp, updateDoc,orderBy,onSnapshot } from "firebase/firestore";

export const addLink =async (formData) => {
    console.log(formData);
    const collectionRef= collection(db, "links");
    const newItem={...formData,timestamp:serverTimestamp()}
    const newDocRef=await addDoc(collectionRef,newItem)
    //console.log("az új documentum azonosítója:",newDocRef.id)
  };

  export const gitHubUserName=(url)=>{
    return url.split('/')[2].replace('.github.io', '');
  }
  export const readLinks = (classmate,title,setLinks) => {
    const collectionRef = collection(db, "links");
    const q = query(collectionRef,where('classmate','==',classmate),where('title','==',title))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLinks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

export const addPoints=async (id,points,userId)=>{
  console.log(points,userId,id);
  const docRef = doc(db, "links",id);
  await updateDoc(docRef,{rate:arrayUnion({userId,points})})
}

export const check=async (userId,projectId)=>{
  const docRef = doc(db, "links",projectId);
  const docSnap = await getDoc(docRef);
  const arr={ ...docSnap.data()}
  if(arr.rate.find(obj=>obj.userId==userId)) return true
  return false
}
