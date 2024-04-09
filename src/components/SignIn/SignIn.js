import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firestore } from '../../firebase'; // Adjust as necessary
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import './SignIn.css'; // Import the CSS file


function SignIn() {
  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = firestore.collection('users').doc(user.uid);

        // Check if the user exists in Firestore
        userRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              // If the user doesn't exist, create a new document
              userRef.set({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
            }
          })
          .catch((error) => {
            console.error('Error checking/creating user document:', error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        console.error('Error during sign in:', error.message);
      });
  };

  return (
    <div className="signInContainer">
      <p className="signInText">Sign in to Chat App</p>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}


export default SignIn;
