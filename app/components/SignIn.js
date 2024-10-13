import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

function SignIn({ user }) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  return (
    <div>
      {!user ? (
        <button
          onClick={signInWithGoogle}
          className="p-4 bg-blue-500 text-white rounded-lg"
        >
          Sign in with Google
        </button>
      ) : (
        <button
          onClick={handleSignOut}
          className="p-4 bg-red-500 text-white rounded-lg"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}

export default SignIn;
