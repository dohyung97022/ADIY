import React from "react";
import { Link } from "react-router-dom";
import brandImg from "../img/brand.png";
import payInfoImg from "../img/payment-information.jpg";
import BuisinessProposal from "../img/buisiness-proposal.png";
import PaymentMethod from "../img/payment-method.png";
import SaveChannels from "../img/save-channels.png";
import SearchBar from "../components/search-bar";


const PayInfo = () => {
  return (
    <React.Fragment>
      <header className="stk z-i-1">
        <div className="rlt max-main-w opt">
          <div className="abs abs-cntr abs-l flex-h-cntr">
            <Link to="/">
              <img
                className="hdr-img mg-l-2 mg-r-2"
                src={brandImg}
                alt="brandImg"
              />
            </Link>
            <SearchBar />
          </div>
          <div className="abs abs-cntr abs-r">
            <Link to="login">
              <button className="btn-1 mg-r-2">로그인</button>
            </Link>
            <Link to="signup">
              <button className="btn-1 mg-r-2">가입</button>
            </Link>
          </div>
        </div>
        <hr />
        <div className="rlt max-main-w opt">
          <div className="abs abs-cntr abs-l">
            <button className="btn-1 mg-l-1 mg-r-1">
              체널<i className="fas fa-angle-down"></i>
            </button>
            <button className="btn-1 mg-r-1">
              인스타<i className="fas fa-angle-down"></i>
            </button>
            <button className="btn-1 mg-r-1">
              키워드<i className="fas fa-angle-down"></i>
            </button>
          </div>
        </div>
        <hr />
      </header>
      
    <div className="txt-cnt why-width mg-auto">
    <h3 className="c-font-1 mg-b-3 mg-t-2">Payment Information</h3>
      <div className="btn-4 mg-b-2 mg-t-2">
        <img className="pay-img mg-t-16" src={payInfoImg} alt="payInfoImg" />
      </div>
      <div className="flex-col">
      </div>
    </div>
    </React.Fragment>
  );
};

export default PayInfo;
