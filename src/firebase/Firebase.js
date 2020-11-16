import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    })
  : firebase.app();

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

const signInWith = (provider) => {
  auth
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res.user);
      // console.log(res.user.getIdToken());
    })
    .catch((error) => {
      console.log(error.message);
    });
};
//반드시 AuthContext의 currentUser 확인 후 getIDToken().then(function (token) {
export function getIDToken() {
  if (auth.currentUser) {
    return auth.currentUser.getIdToken().then((token) => {
      return token;
    });
  }
}
export const signInWithGoogle = () => {
  signInWith(googleProvider);
};
export const signInWithFacebook = () => {
  signInWith(facebookProvider);
};
export const signInWithTwitter = () => {
  signInWith(twitterProvider);
};
export const signInWithGithub = () => {
  signInWith(githubProvider);
};