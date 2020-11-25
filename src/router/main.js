import React, { useContext } from "react";
import brandImg from "../img/brand.png";
import SearchBar from "../components/search-bar";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/FirebaseContext";
import { firebaseApp } from "../firebase/Firebase";

const Main = () => {
  const currentUser = useContext(AuthContext);

  const LoginAndRegister = (
  <><Link to="/signin">
  <button className="btn-1 mg-r-2">Login</button>
  </Link>
  <Link to="/signup">
  <button className="btn-1 mg-r-2">Register</button>
  </Link></>
  )
  
  const accountAndLogout = (
  <>
    <Link className="" to="/profile">
    <img className="hdr-img mg-l-2 mg-r-1 vert-cntr user-img" src={currentUser ? currentUser.photoURL:brandImg } alt="brandImg" />
    </Link>
    <button className="btn-1 mg-r-2" onClick={()=>{firebaseApp.auth().signOut()}}>Logout</button>
  </>
  )

  return (
    <React.Fragment>
      <div className="rlt opt">
        <div className="abs abs-cntr abs-r">
          {(currentUser ? accountAndLogout:LoginAndRegister)}
        </div>
      </div>
      <Link className="rlt flex-cnt mg-t-5 main-img" to="/">
        <img className="main-img" src={brandImg} alt="brandImg" />
      </Link>
      <p className="rlt flex-cnt mg-t-0">
        Ads are expensive, so Do It Yourself!
      </p>
      <div className="rlt flex-cnt mg-t-1">
        <SearchBar />
      </div>
    </React.Fragment>
  );
};

export default Main;
