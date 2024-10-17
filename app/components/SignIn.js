import React from "react";
import { db, auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SignIn({ user }) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in successfully");

      // CHECKING IF USER IS IN THE DATABSE
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log("User already exists in Firestore");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
      console.log("User data saved to Firestore");
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
