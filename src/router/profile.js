import React, {useContext,useEffect,useState} from "react";
import { Link } from "react-router-dom";
import brandImg from "../img/brand.png";
import BuisinessProposal from "../img/buisiness-proposal.png";
import PaymentMethod from "../img/payment-method.png";
import SaveChannels from "../img/save-channels.png";
import SearchBar from "../components/search-bar";
import { firebaseApp, getIDToken } from "../firebase/Firebase";
import { AuthContext } from "../firebase/FirebaseContext";

const Profile = () => {
  const currentUser = useContext(AuthContext);
  const [paymentCancelButton, setPaymentCancelButton] = useState();
  const LoginAndRegister = (
    <React.Fragment><Link to="/signin">
    <button className="btn-1 mg-r-2">Login</button>
    </Link>
    <Link to="/signup">
    <button className="btn-1 mg-r-2">Register</button>
    </Link></React.Fragment>)
  
  const accountAndLogout = (
    <>
    <Link className="" to="/profile">
    <img className="hdr-img mg-l-2 mg-r-1 vert-cntr user-img" src={currentUser ? currentUser.photoURL:brandImg } alt="brandImg" />
    </Link>
    <button className="btn-1 mg-r-2" onClick={()=>{firebaseApp.auth().signOut()}}>Logout</button>
  </>
  )

function cancelPayment(){
  var r = window.confirm("Are you sure you want to cancel our subscription?");
  if (r == true) {
    getIDToken().then(function (token) {
      fetch('https://payment.adiy.io/payment', {
      method: 'POST',
      body: JSON.stringify({
        IDToken: token,
        PaymentID: "",
        Type:'cancel',
        })
      }).then(res => 
        res.json()
        ).then((json) => {
        if (json["payment"]=="cancelled"){
          alert("You have successfully cancelled subscription.")
          window.open("/","_self");
        }
        console.log(json);
      });
  })
  }
}

useEffect(() => {
  if (!currentUser) {window.open("/","_self");}
  else {
    getIDToken().then(function (token) {
      fetch('https://payment.adiy.io/payment', {
      method: 'POST',
      body: JSON.stringify({
        IDToken: token,
        PaymentID: '',
        Type:'check',
        })
      }).then(res => 
        res.json()
        ).then((json) => {
        if (json["payment"]=="true"){
          setPaymentCancelButton(
            <button className="btn-4 mg-b-2" onClick={()=>{cancelPayment()}}>
            <h1 className="mg-t-1 c-font-3">Cancel Payment</h1>
            <img className="profile-img mg-b-1 mg-t-1" src={PaymentMethod} alt="brandImg" />
            <p className="mg-b-1">Cancel your payment information.</p>
            </button>
          )
        }
      });
    })
  }
  }, [currentUser]);

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
          {(currentUser ? accountAndLogout:LoginAndRegister)}
          </div>
        </div>
        <hr />
      </header>
      
      <div className="txt-cnt why-width mg-auto">
      <img className="user-img grid-img mg-t-32" src={currentUser ? currentUser.photoURL:brandImg } alt="brandImg" />
      <h3 className="c-font-1 mg-b-3 mg-t-2">Welcome, {currentUser ? currentUser.displayName:"User"  }</h3>
        <div className="flex-col">

        <button className="btn-4 mg-b-2"><h1 className="mg-t-1 c-font-2">Business Proposals</h1>
        <h1 className="mg-t-1 c-font-3">Coming Soon!</h1>
        <img className="profile-img mg-b-1 mg-t-1" src={BuisinessProposal} alt="brandImg" />
        <p className="mg-b-1">Check out our suggestions for business proposals. And create one as you wish.</p>
        </button>

        <button className="btn-4 mg-b-2"><h1 className="mg-t-1 c-font-2">Saved Channels</h1>
        <h1 className="mg-t-1 c-font-3">Coming Soon!</h1>
        <img className="profile-img mg-b-1 mg-t-1" src={SaveChannels} alt="brandImg" />
        <p className="mg-b-1">Saved and group channels as much as you like!</p>
        </button>
        {/* <button className="btn-4 mg-b-2"><h1 className="mg-t-1 c-font-2">Payment Information</h1>
        <h1 className="mg-t-1 c-font-3">Coming Soon!</h1>
        <img className="profile-img mg-b-1 mg-t-1" src={PaymentMethod} alt="brandImg" />
        <p className="mg-b-1">Check your payment information.</p>
        </button> */}
        {paymentCancelButton}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
