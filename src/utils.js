//a backend kölünválasztva
import {db} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,arrayUnion,
  where,getDocs,serverTimestamp, updateDoc,orderBy,onSnapshot } from "firebase/firestore";


  export const classes=['12A/3','12A/2','11A/1','11A/2']
  export const projects=['Kajak-kenu','Ingyenes-tanfolyamok','Portfólió','Utazási iroda']
  

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
  const points=arr.rate.reduce((acc,obj)=>obj.points ? acc+obj.points : acc,0)
  const votes=(arr.rate.filter(obj=>obj.points && obj.points>0)).length
  setPoints(points)
  setVotes(votes)

}

export const readProjectResults= (classmate,title,setResults) => {
  const collectionRef = collection(db, "links");
  const q = query(collectionRef,where('classmate','==',classmate),where('title','==',title))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setResults(snapshot.docs.map(doc => ({ linkUrl:doc.data().linkUrl,rate:doc.data().rate })));
  });
  return unsubscribe;
};