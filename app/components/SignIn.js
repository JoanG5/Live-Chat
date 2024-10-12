import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

function SignIn() {
  return (
    <button
      onClick={() =>
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      }
    >
      Sign in with Google
    </button>
  );
}

export default SignIn;
