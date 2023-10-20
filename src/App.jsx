import "@fontsource/montserrat";
import "./App.css";
import React, { useState } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { AddLink } from "./components/AddLink";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Navbar } from "./components/Navbar";
import { Eval } from "./components/Eval";
import { Result } from "./components/Result";
import { Home } from "./components/Home";
import {auth} from './firebaseApp'

const cookies = new Cookies(); //to set and get cookies from the browser

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); //true vagy false lesz
  const [user,setUser]=useState(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('user status changed:',user);
      
    });

    return () => unsubscribe();
  }, []);
 

  if (!isAuth) {
    return (
      <div className="App p-3">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <BrowserRouter>
    <div className="App">
     
        <Navbar/>
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddLink />} />
              <Route path="/eval" element={<Eval />} />
              <Route path="/results" element={<Result />} />
        </Routes>
     

    </div>
  </BrowserRouter>
  );
}

export default App;
