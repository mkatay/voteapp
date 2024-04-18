//a backend kölünválasztva
import { db } from "./firebaseApp";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  getDoc,
  arrayUnion,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";


export const addLink = async (formData) => {
  console.log(formData.linkUrl);
  const collectionRef = collection(db, "links");
  const q = query(
    collectionRef,
    where("classmate", "==", formData.classmate),
    where("title", "==", formData.title)
  );
  // Ellenőrizzük, hogy van-e már dokumentum ahol a linkUrl megegyezik a formData.linkUrl attribútummal
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs;
  let exist = arr.some((doc) => doc.data().linkUrl == formData.linkUrl);
  if (!exist) {
    const newItem = { ...formData, timestamp: serverTimestamp() };
    await addDoc(collectionRef, newItem);
    return true;
  } else console.log("már be van vezetve");
  return false;
};

export const gitHubUserName = (url) => {
  try{
    return url.split("/")[2].replace(".github.io", "");
  }catch(err){
    return 'invalid GitHub username!'
  }
  
};

export const readLinks = (classmate, title, setLinks,setImgSrc) => {
  //kell a kép elérhetősége:
  const collRef = collection(db, "projects");
  const qProject = query(collRef,  where("name", "==", title))
  onSnapshot(qProject, (snapshot) => {
    //console.log(snapshot.docs);
    setImgSrc(snapshot.docs.map(doc => ({ imgSrc:doc.data().descr })));
  });


  const collectionRef = collection(db, "links");
  const q = query(
    collectionRef,
    where("classmate", "==", classmate),
    where("title", "==", title)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setLinks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const addPoints = async (id, points, userId) => {
  console.log(points, userId, id);
  const docRef = doc(db, "links", id);
  await updateDoc(docRef, { rate: arrayUnion({ userId, points }) });
};

export const check = async (userId, projectId) => {
  const docRef = doc(db, "links", projectId);
  const docSnap = await getDoc(docRef);
  const arr = { ...docSnap.data() };
  if (arr.rate.find((obj) => obj.userId == userId)) return true;
  return false;
};
export const readPoints_old = async (projectId, setPoints, setVotes) => {
  const docRef = doc(db, "links", projectId);
  const docSnap = await getDoc(docRef);
  const arr = { ...docSnap.data() };
  console.log(arr);
  const points = arr.rate.reduce(
    (acc, obj) => (obj.points ? acc + obj.points : acc),
    0
  );
  const votes = arr.rate.filter((obj) => obj.points && obj.points > 0).length;
  setPoints(points);
  setVotes(votes);
};

export const readPoints = async (projectId, setPoints, setVotes) => {
  const docRef = doc(db, "links", projectId);
  const unsubscribe=onSnapshot(docRef, (docSnap) => {
    const arr = { ...docSnap.data() };
    if(arr?.rate){
      const newPoints = arr.rate.reduce((acc, obj) => (obj.points ? acc + obj.points : acc), 0 );
      const newVotes = arr.rate.filter((obj) => obj.points && obj.points > 0).length;
      setPoints(newPoints);
      setVotes(newVotes);
    }
    
    return unsubscribe
  });
};
export const readProjectResults = (classmate, title, setResults) => {
  const collectionRef = collection(db, "links");
  const q = query(
    collectionRef,
    where("classmate", "==", classmate),
    where("title", "==", title)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setResults(
      snapshot.docs.map((doc) => ({
        linkUrl: doc.data().linkUrl,
        rate: doc.data().rate,
      }))
    );
  });
  return unsubscribe;
};
//populate selects
const readProjects = (setProjects) => {
  const collectionRef = collection(db, "projects");
  const q = query(collectionRef, orderBy('name', 'asc'))
  onSnapshot(q, (snapshot) => {
    setProjects(snapshot.docs.map(doc => doc.data().name));
  });
};
export const readClasses = (setClasses,setProjects) => {
  readProjects(setProjects)
  const collectionRef = collection(db, "classes");
  const q = query(collectionRef, orderBy('class', 'asc'))
  onSnapshot(q, (snapshot) => {
    setClasses(snapshot.docs.map(doc => doc.data().class));
  });
};

export const deleteProject=async (id)=>{
  const docRef= doc(db, "links", id);
  await deleteDoc(docRef)

}
/////////////////////////////////////////////////dashboard-admin:

export const readClassRows = (setRows) => {
  const collectionRef = collection(db, "classes");
  const q = query(collectionRef, orderBy('class', 'asc'))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setRows(snapshot.docs.map(doc => ({ class:doc.data().class,id: doc.id })));
  });
  return unsubscribe;
};

export const deleteSelectedClass=async (selection)=>{
  selection.map(async (id)=>{
    const docRef = doc(db, "classes", id);
    await deleteDoc(docRef)
  })
}
export const addClass = async (newItem)=> {
  const collectionRef = collection(db, "classes");
  await addDoc(collectionRef, newItem);
};
export const addProject = async (newItem)=> {
  const collectionRef = collection(db, "projects");
  await addDoc(collectionRef, newItem);
};

export const readProjectRows = (setRows) => {
  const collectionRef = collection(db, "projects");
  const q = query(collectionRef, orderBy('name', 'asc'))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setRows(snapshot.docs.map(doc => ({ name:doc.data().name,descr:doc.data().descr,id: doc.id })));
  });
  return unsubscribe;
};
export const deleteSelectedProject=async (selection)=>{
  selection.map(async (id)=>{
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef)
  })
}