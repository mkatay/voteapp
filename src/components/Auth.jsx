import React from "react";
import { auth, provider } from "../firebaseApp";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { FaGoogle } from "react-icons/fa";
import { Button } from "reactstrap";

const cookies = new Cookies(); //to set and get cookies from the browser

const middleStyle={
 position:"absolute",
 top:"50%",
 left:"50%",
 transform: "translate(-50%, -50%)"
}

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


/*  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Use 'GoogleAuthProvider' directly
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
    await signInWithPopup(auth, provider); // Use 'provider' directly here
      console.log(result); //egy nagy objektum, amiből szükségünk lesz a tokenre
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
        console.log(error);
    }
    };*/

  return (
    <div className="auth bg-light " style={middleStyle}>
      <h6 className="mt-2">Sign in with Google to continue</h6>
      <Button color="primary" size="lg" onClick={signInWithGoogle}>
            <FaGoogle /> 
      </Button>
      
    </div>
  );
};
