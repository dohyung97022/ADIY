import React from 'react';
import firebase from 'firebase/app';
import "firebase/auth";


firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const twitterProvider = new firebase.auth.TwitterAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()

const signInWith = (provider) => {
  auth.signInWithPopup(provider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}


function FirebaseAuth() {
  return (
    <div className="App">
      <div className="login-buttons">
        <button className="login-provider-button" onClick={()=>{signInWith(googleProvider)}}>
        <span> Continue with Google</span>
       </button>
       <button className="login-provider-button" onClick={()=>{signInWith(facebookProvider)}}>
        <span> Continue with Facebook</span>
       </button>
       <button className="login-provider-button" onClick={()=>{signInWith(twitterProvider)}}>
        <span> Continue with Twitter</span>
       </button>
       <button className="login-provider-button" onClick={()=>{signInWith(githubProvider)}}>
        <span> Continue with Github</span>
       </button>
      </div>
    </div>
  );
}

export default FirebaseAuth;
