import React from "react";
import brandImg from "../img/brand.png";
import SearchBar from "../components/search-bar";
import { Link } from "react-router-dom";

const main = () => {
  return (
    <React.Fragment>
      <div className="rlt opt">
        <div className="abs abs-cntr abs-r">
          <Link to="/login">
            <button className="btn-1 mg-r-2">로그인</button>
          </Link>
          <Link to="/signup">
            <button className="btn-1 mg-r-2">가입</button>
          </Link>
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

export default main;
