import React from "react";
import { auth, provider } from "../firebaseApp";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { FaGoogle } from "react-icons/fa";
import { Button } from "reactstrap";

const cookies = new Cookies(); //to set and get cookies from the browser

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result); //egy nagy objektum, amiből szükségünk lesz a tokenre
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="auth bg-light">
      <h6 className="mt-2">Sign in with Google to continue</h6>
      <Button color="primary" size="lg" onClick={signInWithGoogle}>
            <FaGoogle /> 
      </Button>
      
    </div>
  );
};
