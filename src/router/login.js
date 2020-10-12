import React from "react";
import brandImg from "../img/brand.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <React.Fragment>
      <div className="rlt opt"></div>
      <Link className="rlt flex-cnt mg-t-5 main-img" to="/">
        <img className="main-img" src={brandImg} alt="brandImg" />
      </Link>
      <p className="rlt flex-cnt mg-t-0">
        Ads are expensive, so Do It Yourself!
      </p>
      <form className="rlt log-width mg-t-1">
        <div className="log-input rlt w-100 mg-t-1">
          <input type="text" name="email" autoComplete="off" required />
          <span className="label">Name</span>
        </div>
        <div className="log-input rlt w-100 mg-t-1">
          <input type="password" name="password" autoComplete="off" required />
          <span className="label">Password</span>
        </div>
        <div className="flex-sp-bt mg-t-1">
          <button className="btn-1">
            <Link to="/signup">
              <h1>회원가입</h1>
            </Link>
          </button>
          <Link to="/">
            <button className="btn-1" type="submit">
              <h1>로그인</h1>
            </button>
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
