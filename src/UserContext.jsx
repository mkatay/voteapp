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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('user status changed:',user);
      
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
    <UserContext.Provider value={{ user,logoutUser,isAuth,setIsAuth}}>
                                     
      {children}
    </UserContext.Provider>
  );
};
