import React from "react";
import { Link } from "react-router-dom";
import brandImg from "../img/brand.png";
import BuisinessProposal from "../img/buisiness-proposal.png";
import PaymentMethod from "../img/payment-method.png";
import SaveChannels from "../img/save-channels.png";
import SearchBar from "../components/search-bar";


const Profile = () => {
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
      <img className="grid-img mg-t-16" src={brandImg} alt="brandImg" />
        <h3 className="c-font-1 mg-b-3 mg-t-2">Welcome, Dohyung</h3>
        <div className="flex-col">

        <button className="btn-4 mg-b-2"><h1 className="mg-t-1 c-font-3">Business Proposal</h1>
        <img className="profile-img mg-b-1 mg-t-1" src={BuisinessProposal} alt="brandImg" />
        <p className="mg-b-1">Check out our suggestions for business proposals. And create one as you wish.</p>
        </button>

        <button className="btn-4 mg-b-2"><h1 className="mg-t-1 c-font-3">Save Channels</h1>
        <img className="profile-img mg-b-1 mg-t-1" src={SaveChannels} alt="brandImg" />
        <p className="mg-b-1">Save and group channels as much as you like!</p>
        </button>

        <button className="btn-4 mg-b-2"><h1 className="mg-t-1 c-font-3">Payment Information</h1>
        <img className="profile-img mg-b-1 mg-t-1" src={PaymentMethod} alt="brandImg" />
        <p className="mg-b-1">Check your payment information.</p>
        </button>

        Saved Channel Payment Information
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
