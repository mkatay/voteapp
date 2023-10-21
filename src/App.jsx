import "@fontsource/montserrat";
import "./App.css";
import React, { useState } from "react";
import { Auth } from "./components/Auth";
//
import { AddLink } from "./components/AddLink";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Eval } from "./components/Eval";
import { Result } from "./components/Result";
import { Home } from "./components/Home";

import { UserContext } from "./UserContext";
import { useContext } from "react";

function App() {
  const { isAuth,user,setIsAuth } = useContext(UserContext);
  console.log(user);
  return (
      <BrowserRouter>
        <div className="App">
          {!isAuth ? (
            <Auth setIsAuth={setIsAuth} />
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddLink />} />
                <Route path="/eval" element={<Eval />} />
                <Route path="/results" element={<Result />} />
              </Routes>
            </>
          )}
        </div>
      </BrowserRouter>

  );
}

export default App;
