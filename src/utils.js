//a backend kölünválasztva
import {db} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,arrayUnion,
  where,getDocs,serverTimestamp, updateDoc,orderBy,onSnapshot } from "firebase/firestore";

export const addLink =async (formData) => {
    console.log(formData.linkUrl);
    const collectionRef= collection(db, "links");
    const q = query(collectionRef,where('classmate','==',formData.classmate),where('title','==',formData.title))
    // Ellenőrizzük, hogy van-e már dokumentum ahol a linkUrl megegyezik a formData.linkUrl attribútummal
    const querySnapshot = await getDocs(q);
    const arr=querySnapshot.docs
    let exist=arr.some(doc=>doc.data().linkUrl==formData.linkUrl)
    if(!exist){
        const newItem={...formData,timestamp:serverTimestamp()}
        await addDoc(collectionRef,newItem)
        return true
    }
    else
      console.log('már be van vezetve');
      return false
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
export const readPoints=async (projectId,setPoints,setVotes)=>{
  const docRef = doc(db, "links",projectId);
  const docSnap = await getDoc(docRef);
  const arr={ ...docSnap.data()}
  console.log(arr);
  const points=arr.rate.reduce((acc,obj)=>acc+obj.points,0)
  const votes=arr.rate.length
  setPoints(points)
  setVotes(votes)

}
