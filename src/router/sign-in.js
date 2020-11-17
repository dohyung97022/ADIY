import React from "react";
import { Link } from "react-router-dom";
import brandImg from "../img/brand.png";
import facebookSvg from "../social-media-svg/facebook.svg";
import twitterSvg from "../social-media-svg/twitter.svg";
import googleSvg from "../social-media-svg/google.svg";
import emailSvg from "../social-media-svg/email.svg";
import {
  firebaseApp,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  signInWithGithub,
} from "../firebase/Firebase";
const SignIn = () => {
  return (
    <React.Fragment>
      <div className="rlt opt"></div>
      <Link className="rlt flex-cnt mg-t-5 main-img" to="/">
        <img className="main-img" src={brandImg} alt="brandImg" />
      </Link>
      <p className="rlt flex-cnt mg-t-0">
        Ads are expensive, so Do It Yourself!
      </p>
      <div className="rlt log-width mg-t-2">
        <button className="log-width flex-h-cntr" onClick={() => {signInWithGoogle();}}>
          <img src={googleSvg} className="w-sign-svg" alt="googleSvg"></img>
          <h1 className="w-100 c-font-2">Sign in with google</h1>
        </button>
        <button className="log-width flex-h-cntr mg-t-1" onClick={() => {signInWithFacebook();}}>
          <img src={facebookSvg} className="w-sign-svg" alt="facebookSvg"></img>
          <h1 className="w-100 c-font-2">Sign in with facebook</h1>
        </button>
        <button className="log-width flex-h-cntr mg-t-1" onClick={() => {signInWithTwitter();}}>
          <img src={twitterSvg} className="w-sign-svg" alt="twitterSvg"></img>
          <h1 className="w-100 c-font-2">Sign in with twitter</h1>
        </button>
        {/* <button className="log-width flex-h-cntr mg-t-1" onClick={() => {signInWithGoogle();}}>
          <img src={emailSvg} className="w-sign-svg" alt="emailSvg"></img>
          <h1 className="w-100 c-font-2">Sign up with email</h1>
        </button> */}
        <div className="flex-sp-bt mg-t-1">
          <div></div>
          <Link to="/login">
            <button className="btn-1">
              <h1>Back</h1>
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
