import React from "react";
import { Link } from "react-router-dom";
import brandImg from "../img/brand-36.png";
import youtuberImg from "../img/youtuber.png";
import businessManImg from "../img/business-man.png";
import youtubeSvg from "../social-media-svg/youtube.svg";
import BarChart from "../chart/bar";
import SearchBar from "../components/search-bar";

const Why = () => {
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
        <h3 className="btn-1 c-font-1 mg-b-2 mg-t-3">Why ADIY?</h3>

        <h1 className="">
          Google adsense, has been leading the advertising industry for over 10
          years now, but advertising prices never seems to go down. The average
          cost of CPC of all industry is about 2.3$.
        </h1>
        <div className="why-crt-cnt">
          <BarChart />
        </div>
        <p className="mg-t-0 mg-b-1">Average cpc of 2.3 $</p>
        <h1 className="mg-b-1">
          Now you would be wondering how you could advertising your business,
          but with a affordable price. That is where ADIY comes in.
        </h1>
        <h3 className="c-font-1 mg-b-1 mg-t-3">Why are ads so expensive?</h3>
        <h1 className="mg-b-2">' The Middle man '</h1>
        <h1 className="mg-b-2">
          The middle man is a business term for a company that is in the middle
          of the supplyer and the buyer that gains profit from doing so. For
          example, if you make an advertisement in youtube, the supplyer would
          be the youtuber who supplys traffic. And the buyer would be you. Then
          who would the middle man be?
        </h1>
        <h3 className="c-font-1 mg-b-2">Youtube</h3>
        <h1 className="mg-b-2">
          So you must be wondering how much youtube profits by being the 'middle
          man'.
        </h1>
        <div className="flex-cnt mg-b-2">
          <div className="mg-r-0 mg-l-0">
            <img className="w-2" src={youtuberImg} alt="youtuberImg" />
            <p className="w-2">Youtuber earns avr 1~3$ per M</p>
          </div>
          <div className="mg-r-0 mg-l-0">
            <img className="w-2" src={youtubeSvg} alt="youtubeSvg" />
            <p className="w-2">Youtube takes avr 9~27$ per M</p>
          </div>
          <div className="mg-r-0 mg-l-0">
            <img className="w-2" src={businessManImg} alt="businessManImg" />
            <p className="w-2">Advertiser pays avr 10~30$ per M</p>
          </div>
        </div>
        <h1 className="mg-b-2">
          Well of course we did not calculate tax and operating expenses that
          youtube spends but you get the gist of it.
        </h1>
        <h3 className="c-font-1 mg-b-2">So what should we do?</h3>
      </div>
    </React.Fragment>
  );
};

export default Why;
