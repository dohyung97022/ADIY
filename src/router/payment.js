import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import brandImg from "../img/brand-36.png";
import SearchBar from "../components/search-bar";
import { AuthContext } from "../firebase/FirebaseContext";
import { getIDToken } from "../firebase/Firebase";

function Paypal() {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      getIDToken().then(function (token) {
        fetch('https://wefeu9543j.execute-api.us-east-2.amazonaws.com/default/go-payment-lambda', {
        method: 'POST',
        body: JSON.stringify({
          IDToken: token,
          paymentID: '',
          })
        }).then(res => 
          res.json()
          ).then((json) => {
          if (json["payment"]=="true"){
            alert("This account is already being paid.")
            window.open("/main","_self");
          }
          console.log(json);
        });
    })
  }
  }, []);

  useEffect(() => {
    if (currentUser){
      window.paypal
      .Buttons({
        createSubscription: (data, actions) => {
          return actions.subscription.create({
            //출시 상품 만들고 이 번호를 변경
            plan_id: "P-9FJ0814303766574HL4BSGHY",
          });
        },
        onApprove: async (data, actions) => {
          console.log(
            "You have successfully created subscription " + data.subscriptionID
          );
          // const order = await actions.order.capture();
          setPaidFor(true);
          savePayment(data.subscriptionID);
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
    }
  });
  function savePayment(subscriptionID){
    getIDToken().then(function (token) {
      fetch('https://wefeu9543j.execute-api.us-east-2.amazonaws.com/default/go-payment-lambda', {
      method: 'POST',
      body: JSON.stringify({
        IDToken: token,
        paymentID: subscriptionID,
        })
      }).then(res => 
        res.json()
        ).then((json) => {
        if (json["payment"]=="true"){
          alert("this account is now being paid")
          window.open("/main","_self");
        }
        console.log(json);
      });
  })
  }
  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought!</h1>
      </div>
    );
  }
  if (currentUser){
    return (
      <div>
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <div ref={paypalRef} />
      </div>
    );
  }
}

const payment = () => {
  var plans = [];
  for (var i = 1; i <= 1; i++) {
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
          className={"txt-cnt c-font-2 pd-t-2 pd-b-2 flex-cnt flex-h-cntr " + c}
        >
          17$ / Month
        </h3>
        <div className="flex-row mg-t-1 mg-b-1">
          <div className="pay-itm-l mg-auto">
            <h4 className="mg-t-0 btn-1">Search</h4>
            <h4 className="mg-t-0 btn-1">Channel Filtering</h4>
            <h4 className="mg-t-0 btn-1">Channel Keyword Analysis</h4>
            <h4 className="mg-t-0 btn-1">Channel Contacts</h4>
            <h4 className="mg-t-0 btn-1">Cost Analysis</h4>
            <h4 className="mg-t-0 btn-1">Email View</h4>
          </div>
          <div className="pay-itm-r mg-auto txt-cnt">
            <h4 className="mg-t-0 c-font-3">Unlimited</h4>
            <h4 className="mg-t-0 c-font-3">Unlimited</h4>
            <h4 className="mg-t-0 c-font-3">Unlimited</h4>
            <h4 className="mg-t-0 c-font-3">Unlimited</h4>
            <h4 className="mg-t-0 c-font-3">Unlimited</h4>
            <h4 className="mg-t-0 c-font-3">Unlimited</h4>
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
        {/* <div className="rlt max-main-w opt">
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
        <hr /> */}
      </header>
      {/* <img
        className="abs abs-l abs-r mg-auto mg-t-2 z-i--1 pay-img"
        src={shakeHandImg}
        alt="shakeHandImg"
      /> */}
      <h3 className="btn-1 c-font-1 txt-cnt mg-t-4">
        Reach out for more Youtubers!
      </h3>
      <h1 className="txt-cnt c-font-3 mg-t-0">Make advertising affordable!</h1>

      <div className="mg-t-4 flex-cnt flex-h-cntr flex-row media-pay-flex">
        {plans}
      </div>
    </React.Fragment>
  );
};

export default payment;

// product id PROD-23D66300LE1925216
//         "href": "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-23D66300LE1925216",
//         "rel": "self",
//         "method": "GET"
//         "rel": "edit",
//         "method": "PATCH"

// plan id P-9FJ0814303766574HL4BSGHY

// subscription example I-KK62WJR03EHV
