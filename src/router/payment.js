import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import brandImg from "../img/brand-36.png";
import shakeHandImg from "../img/shake-hand.png";
import SearchBar from "../components/search-bar";

function Paypal() {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createSubscription: (data, actions) => {
          return actions.subscription.create({
            plan_id: "P-9FJ0814303766574HL4BSGHY",
          });
        },
        onApprove: async (data, actions) => {
          console.log(
            "You have successfully created subscription " + data.subscriptionID
          );
          // const order = await actions.order.capture();
          setPaidFor(true);
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  });

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought!</h1>
      </div>
    );
  }
  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <div ref={paypalRef} />
    </div>
  );
}

const payment = () => {
  var plans = [];
  for (var i = 1; i <= 3; i++) {
    var c = "bgc-b";
    if (i === 2) {
      c = "bgc-g";
    } else if (i === 3) {
      c = "bgc-o";
    }

    plans.push(
      <div
        className="flex-col bgc-itm pay-itm-w pay-itm-h pay-itm-bdr mg-l-1 mg-r-1 mg-b-3"
        key={i}
      >
        <h3
          className={"txt-cnt c-font-1 pd-t-2 pd-b-2 flex-cnt flex-h-cntr " + c}
        >
          Master Plan
        </h3>
        <div className="flex-row mg-t-1 mg-b-1 pd-l-1 pd-r-1">
          <div className="pay-itm-l mg-r-0">
            <h4 className="mg-t-0 btn-1">검색</h4>
            <h4 className="mg-t-0 btn-1">체널필터링</h4>
            <h4 className="mg-t-0 btn-1">체널 키워드분석</h4>
            <h4 className="mg-t-0 btn-1">체널 지수분석</h4>
            <h4 className="mg-t-0 btn-1">체널 참여도분석</h4>
            <h4 className="mg-t-0 btn-1">이메일 조회</h4>
            <h4 className="mg-t-0 btn-1">키워드 도구</h4>
          </div>
          <div className="pay-itm-r">
            <h4 className="mg-t-0 c-font-3">무제한</h4>
            <h4 className="mg-t-0 c-font-3">무제한</h4>
            <h4 className="mg-t-0 c-font-3">무제한</h4>
            <h4 className="mg-t-0 c-font-3">무제한</h4>
            <h4 className="mg-t-0 c-font-3">무제한</h4>
            <h4 className="mg-t-0 c-font-3">무제한</h4>
            <h4 className="mg-t-0 c-font-3">무제한</h4>
          </div>
        </div>
        <div className="mg-l-1 mg-r-1 paypal-itm-h">
          <Paypal />
        </div>
      </div>
    );
  }
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
            <Link to="/login">
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
      <img
        className="abs abs-l abs-r mg-auto mg-t-2 z-i--1 pay-img"
        src={shakeHandImg}
        alt="shakeHandImg"
      />
      <h3 className="btn-1 c-font-1 txt-cnt mg-t-4">
        Reach out for more Youtubers!
      </h3>
      <h1 className="txt-cnt mg-t-0">Make advertising affordable!</h1>

      <div className="mg-t-4 flex-cnt flex-h-cntr flex-row media-pay-flex">
        {plans}
      </div>
    </React.Fragment>
  );
};

export default payment;

// cli
// sb-9deem2517378@personal.example.com
// e$T'07j(

// dev
// sb-k0k7j2499120@business.example.com
// 0Q&[e8b[
// client id = AWdgHKJwUBzpP136gAaQwmJLztXlsWbxYFeETdgdrWEQIG3Pm5SkEIT9_GiEWErwz0PT4l9wZpCl_4cD
// secret key = EMBjX-Yx94V4tBYDNorLfAlmo32QhBQbdARAoFQiVFRsp039xaD7oRWuP96lRNemrGH24qSM9RHO4T7d
// make the keys encripted and proxy it to make it decripted
// make the proxy call available only in this specific website
// return the credencials from the proxy

// change the client_id:secret key
// curl -v POST https://api.sandbox.paypal.com/v1/oauth2/token -H "Accept:application/json" -H "Accept-Language: en_US" -u "AWdgHKJwUBzpP136gAaQwmJLztXlsWbxYFeETdgdrWEQIG3Pm5SkEIT9_GiEWErwz0PT4l9wZpCl_4cD:EMBjX-Yx94V4tBYDNorLfAlmo32QhBQbdARAoFQiVFRsp039xaD7oRWuP96lRNemrGH24qSM9RHO4T7d" -d "grant_type=client_credentials"
// -H header
// -u, --user <user:password> Server user and password

// access token
// A21AAEFzLJHpxDYiUa9tTqWC4lo2WdAYRTMT-l09PodB6giLWqWnZJgonCJ-Z8tXOJGGlBsgFGw9H1InNLfz5qgycP5CN-n1Q

// call curl by https://reqbin.com/curl

// product id PROD-23D66300LE1925216
//         "href": "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-23D66300LE1925216",
//         "rel": "self",
//         "method": "GET"
//         "rel": "edit",
//         "method": "PATCH"

// plan id P-9FJ0814303766574HL4BSGHY

// subscription I-KK62WJR03EHV
