import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged,signOut} from 'firebase/auth';
import { auth } from './firebaseApp';
import Cookies from "universal-cookie";
const cookies = new Cookies(); //to set and get cookies from the browser

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); //true vagy false lesz
  const [user, setUser] = useState(null);
  const [msg,setMsg]=useState(null)
  const [admin,setAdmin]=useState(false)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log('userContect:',currentUser.email);
      if(currentUser?.email=='kmagdi@kkando.hu')
        setAdmin(true)
      else
        setAdmin(false)
      //console.log('user status changed:',user);
      
    });

    return () => unsubscribe();
  }, []);
console.log(msg);

  const logoutUser=async ()=>{
    await signOut(auth)   
    cookies.remove("auth-token");
        setIsAuth(false);
  }
  
    return (
    <UserContext.Provider value={{ user,logoutUser,isAuth,setIsAuth,admin}}>
                                     
      {children}
    </UserContext.Provider>
  );
};
