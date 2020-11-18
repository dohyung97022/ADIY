import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../index";
import { getEmailFromString, openLinkIfValid, decode, intFormat, sumNaN, checkValidStyle } from "../functions/tools";
import brandImg from "../img/brand-36.png";
import emailSvg from "../social-media-svg/email.svg";
import facebookSvg from "../social-media-svg/facebook.svg";
import instagramSvg from "../social-media-svg/instagram.svg";
import twitchSvg from "../social-media-svg/twitch.svg";
import twitterSvg from "../social-media-svg/twitter.svg";
import youtubeSvg from "../social-media-svg/youtube.svg";
import BarChart from "../chart/bar";
import PieChart from "../chart/pie";
import SearchBar from "../components/search-bar";
import DropDownBtn from "../components/dropdown-btn";
import Loader from "../components/loader";
import { AuthContext } from "../firebase/FirebaseContext";
import { firebaseApp, getIDToken } from "../firebase/Firebase";

const Search = () => {
  const query = new URLSearchParams(window.location.search).get("q");
  const [json, setJson] = useState([]);
  const [channels, setChannels] = useState();
  const [pageButtons, setPageButtons] = useState([]);
  const { chartIntData, setChartIntData, chartStrData, setChartStrData } = useContext(GlobalContext);
  const [csd, setCsd] = useState([]);
  const [cid, setCid] = useState([]);
  const [cpv, setCpv] = useState(0.003);
  const [vsc, setVsc] = useState(2000);
  const [pp, setPp] = useState(7);
  const [subs, setSubs] = useState("");
  const [avrViews, setAvrViews] = useState("");
  const [totalViews, setTotalViews] = useState("");
  const [page, setPage] = useState(0);

  const currentUser = useContext(AuthContext);

  var IDToken = "";
    
  if (currentUser) {
    getIDToken().then(function (token) {
      IDToken = token;
    });
  }
  
  const LoginAndRegister = (
  <React.Fragment><Link to="/signin">
  <button className="btn-1 mg-r-2">Login</button>
  </Link>
  <Link to="/signup">
  <button className="btn-1 mg-r-2">Register</button>
  </Link></React.Fragment>)

  const Logout = (
    <React.Fragment>
    <button className="btn-1 mg-r-2" onClick={()=>{firebaseApp.auth().signOut()}}>Logout</button>
    </React.Fragment>)

  function removeChartDataIndex(i) {
    var csd = chartStrData;
    csd.splice(i, 1);
    setChartStrData([...csd]);
    
    //setting int data
    var cid = chartIntData;
    cid.splice(i, 1);
    setChartIntData([...cid]);
  }
  
  function consoleLogChartData(){
    console.log(chartStrData);
    console.log(chartIntData);
  }

  const DropDownCustom = (props) => {
    return (
      <button
        onClick={() => {
          if (props.q === props.val) {
            if (props.valStr === "subs") {setSubs("");setPage(0);}
            if (props.valStr === "avrViews") {setAvrViews("");setPage(0);}
          } else {
            if (props.valStr === "subs") {setSubs(props.q);setPage(0);}
            if (props.valStr === "avrViews") {setAvrViews(props.q);setPage(0);}
          }
        }}
        style={checkValidStyle(props.q === props.val)}
        className="btn-4 drp-dwn-btn"
        href="#"
      >
        {props.text}
      </button>
    );
  };
  useEffect(() => {
    setChannels(Loader());
    fetch(
      `http://localhost:3000/search?search=${query}${subs}${avrViews}${totalViews}&page=${page}`,{
      method: "GET", 
      headers: {
        "IDToken": IDToken}
    })
      .then((res) => res.json())
      .then((json) => {setJson(json); console.log(json)})
    }, [query, subs, avrViews, totalViews, page, currentUser]);


  useEffect(() => {
        var pushChannels = [];
        for (let i = 0; i < Object.keys(json).length; i++) {
          try {
            pushChannels.push(
              <div
                className="grid-itm bgc-itm"
                key={i}
                onClick={() => {
                  consoleLogChartData();
                  if (!chartStrData.includes(json[i].title) && chartStrData.length <= 4) {
                    //setting string data
                    var csd = chartStrData;
                    csd.push(json[i].title)
                    setChartStrData([...csd]);

                    //setting int data
                    var cid = chartIntData;
                    cid.push(Number(json[i].avr_views));
                    setChartIntData([...cid]);
                  }
                }}
              >
                <img className="grid-img mg-t-16" src={json[i].chan_img} alt="brandImg" />
                <h1 className="txt-dot mg-l-1 mg-r-1">{decode(json[i].title)}</h1>
                <p className="mg-auto mg-t-8 mg-l-0 mg-r-0 txt-dot">{decodeURIComponent(json[i].about)}</p>
                {/* <Link to={"/channel?q=" + json[i].channel}>
                  <button
                    className="btn-3 mg-t-8"
                    onClick={() => {
                      setChannelData(json[i]);
                    }}
                  >
                    View Details
                  </button>
                </Link> */}
                <div className="grid-itm-info mg-t-8 mg-b-8">
                  <div>
                    <h1>{intFormat(json[i].subs, "", "")}</h1>
                    <p className="mg-auto">Subs</p>
                  </div>
                  <div>
                    <h1>{intFormat(json[i].ttl_views, "")}</h1>
                    <p className="mg-auto">Total View</p>
                  </div>
                  <div>
                    <h1>{intFormat(json[i].avr_views, "")}</h1>
                    <p className="mg-auto">Avr View</p>
                  </div>
                </div>
                <hr className="hr-1" />
                <div className="grid-itm-info mg-t-8 mg-b-8">
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i].twitch)}>
                    <img src={twitchSvg} style={checkValidStyle(json[i].twitch)} alt="twitchSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i].instagram)}>
                    <img src={instagramSvg} style={checkValidStyle(json[i].instagram)} alt="instagramSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i].facebook)}>
                    <img src={facebookSvg} style={checkValidStyle(json[i].facebook)} alt="facebookSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i].twitter)}>
                    <img src={twitterSvg} style={checkValidStyle(json[i].twitter)} alt="twitterSvg"></img>
                  </button>
                  <button className="btn-svg">
                    <img src={emailSvg} style={checkValidStyle(json[i].email)} alt="emailSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i].chan_url)}>
                    <img src={youtubeSvg} style={checkValidStyle(json[i].chan_url)} alt="youtubeSvg"></img>
                  </button>
                </div>
              </div>
            );
          } catch (e) {}
        }
        if (pushChannels.length!=0){
          setChannels(pushChannels);
        } else {
          setChannels(Loader);
        }
        if (currentUser){
          setPageButtons((        
            <div className="pageButtons">
            {page>0? (        
             <button
                className="btn-1 mg-b-1"
                onClick={() => {{setPage(page - 1);}}}>
                <h1>
                  <i className="fas fa-angle-left" />
                </h1>
              </button>):
              <button className="btn-1 mg-b-1">
                <h1 className="c-font-3">
                  <i className="fas fa-angle-left" />
                </h1>
              </button>
            }
            <button className="btn-1 mg-l-0 mg-r-0 mg-b-1">
              <h1>{page + 1}</h1>
            </button>
            {Object.keys(json).length==20?  
             <button
                className="btn-1 mg-b-1"
                onClick={() => {setPage(page+1);}}>
                <h1>
                  <i className="fas fa-angle-right" />
                </h1>
              </button>
              :
              <button className="btn-1 mg-b-1">
                <h1 className="c-font-3">
                  <i className="fas fa-angle-right mg-auto" />
                </h1>
              </button>
            }
            </div>));
        } else {
          setPageButtons((        
            <div className="pageButtons">
              <button className="btn-1 mg-b-1">
              <Link to="/payment">
                <h1 className="c-font-3">
                  <i className="fas fa-angle-left" />
                </h1>
              </Link>
              </button>
            <button className="btn-1 mg-l-0 mg-r-0 mg-b-1">
              <h1>{page + 1}</h1>
            </button>
              <button className="btn-1 mg-b-1">
              <Link to="/payment">
                <h1 className="c-font-3">
                  <i className="fas fa-angle-right mg-auto" />
                </h1>
              </Link>
              </button>
            </div>));
        }
  }, [json,chartIntData,chartStrData]);

  return (
    <React.Fragment>
      <header className="stk z-i-1">
        <div className="rlt max-main-w opt">
          <div className="abs abs-cntr abs-l flex-h-cntr">
            <Link to="/">
              <img className="hdr-img mg-l-2 mg-r-2" src={brandImg} alt="brandImg" />
            </Link>
            <SearchBar />
          </div>
          <div className="abs abs-cntr abs-r">
          {(currentUser ? Logout:LoginAndRegister)}
          </div>
        </div>
        <hr />
        {/* <div className="rlt max-main-w opt">
          <div className="abs abs-cntr abs-l">
            <button className="btn-1 mg-l-1 mg-r-1">
              체널<i className="mg-svg fas fa-angle-down"></i>
            </button>
            <button className="btn-1 mg-r-1">
              인스타<i className="mg-svg fas fa-angle-down"></i>
            </button>
            <button className="btn-1 mg-r-1">
              키워드<i className="mg-svg fas fa-angle-down"></i>
            </button>
          </div>
        </div>
        <hr /> */}
        <div className="rlt max-main-w mg-t-2 mg-b-1">
          <h1 className="txt-cnt c-font-1">{query}</h1>
        </div>
        <div className="rlt max-main-w flex-cnt grid-gap txt-cnt mg-t-2">
          <p
            className="txt-dot"
            onClick={() => {
              removeChartDataIndex(0);
            }}
          >
            <i className="fas fa-square mg-r-1 c-b" />
            {chartStrData[0]}
          </p>
          <p
            className="txt-dot"
            onClick={() => {
              removeChartDataIndex(1);
            }}
          >
            <i className="fas fa-square mg-r-1 c-p" />
            {chartStrData[1]}
          </p>
          <p
            className="txt-dot"
            onClick={() => {
              removeChartDataIndex(2);
            }}
          >
            <i className="fas fa-square mg-r-1 c-o" />
            {chartStrData[2]}
          </p>
          <p
            className="txt-dot"
            onClick={() => {
              removeChartDataIndex(3);
            }}
          >
            <i className="fas fa-square mg-r-1 c-g" />
            {chartStrData[3]}
          </p>
          <p
            className="txt-dot"
            onClick={() => {
              removeChartDataIndex(4);
            }}
          >
            <i className="fas fa-square mg-r-1 c-s" />
            {chartStrData[4]}
          </p>
        </div>
        <div className="rlt max-main-w flex-cnt grid-gap txt-cnt mg-t-0 mg-b-1">
          <p className="none media-show">cost per view : {cpv} $</p>
          <p className="none media-show">{vsc} views to 1 sales</p>
          <p className="none media-show">product price : {pp} $</p>
        </div>
        <div className="rlt max-main-w flex-cnt grid-gap">
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-b">
              <h1 className="mg-l-2">Views</h1>
            </div>
            <div className="flex-itm-iner mg-auto">
              <BarChart yAxis="true" intAryData="" strAryData="" />
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-p">
              <h1 className="mg-l-2">Ad Cost</h1>
            </div>
            <div className="flex-itm-iner mg-t-0 flex-itm-grid mg-auto">
              <div className="grid-1"></div>
              <p className="grid-2 mg-auto">views</p>
              <p className="grid-3 mg-auto">cost</p>
              <p className="grid-4 mg-auto">total</p>
              <div className="grid-1">
                <i className="fas fa-square mg-auto c-b" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[0], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[0] * cpv, ""," $")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-p" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[1], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[1] * cpv, "", " $")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-o" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[2], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[2] * cpv,"", " $")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-g" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[3], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[3] * cpv,"", " $")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-s" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[4], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[4] * cpv, "", " $")}</p>

              <h2 className="grid-4 grid-4-val mg-auto txt-dot">
                {intFormat(
                  sumNaN(chartIntData[0], chartIntData[1], chartIntData[2], chartIntData[3], chartIntData[4]) * cpv,
                  "", "$"
                )}
              </h2>
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-o">
              <h1 className="mg-l-2">Sales</h1>
            </div>
            <div className="flex-cnt flex-itm-iner mg-t-0 mg-auto">
              <div className="grap-p mg-auto">
                <PieChart />
              </div>
              <div className="flex-itm-total flex-itm-grid-1 txt-cnt">
                <p className="mg-auto">total</p>
                <h2 className="grid-4-val mg-auto">
                  {intFormat(
                    (sumNaN(chartIntData[0], chartIntData[1], chartIntData[2], chartIntData[3], chartIntData[4]) /
                      vsc) *
                      pp,
                    "", "$"
                  )}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-g">
              <h1 className="mg-l-2">Profit</h1>
            </div>
            <div className="flex-itm-iner mg-t-0 flex-itm-grid mg-auto">
              <div className="grid-1"></div>
              <p className="grid-2 mg-auto">sales</p>
              <p className="grid-3 mg-auto">prof</p>
              <p className="grid-4 mg-auto">total</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-b" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[0] / vsc) * pp, "", " $")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[0] / vsc) * pp - chartIntData[0] * cpv, "", " $")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-p" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[1] / vsc) * pp, "", " $")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[1] / vsc) * pp - chartIntData[1] * cpv, "", " $")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-o" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[2] / vsc) * pp, "", " $")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[2] / vsc) * pp - chartIntData[2] * cpv, "", " $")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-g" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[3] / vsc) * pp, "", " $")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[3] / vsc) * pp - chartIntData[3] * cpv, "", " $")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-s" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[4] / vsc) * pp, "", " $")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[4] / vsc) * pp - chartIntData[4] * cpv, "", " $")}
              </p>

              <h2 className="grid-4 grid-4-val mg-auto c-font-2 txt-dot">
                {intFormat(
                  sumNaN(
                    (chartIntData[0] / vsc) * pp - chartIntData[0] * cpv,
                    (chartIntData[1] / vsc) * pp - chartIntData[1] * cpv,
                    (chartIntData[2] / vsc) * pp - chartIntData[2] * cpv,
                    (chartIntData[3] / vsc) * pp - chartIntData[3] * cpv,
                    (chartIntData[4] / vsc) * pp - chartIntData[4] * cpv
                  ),
                  "",
                  "$"
                )}
              </h2>
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-s">
              <h1 className="mg-l-2">Options</h1>
            </div>
            <div className="flex-itm-iner mg-t-0 flex-itm-grid-2 txt-cnt mg-auto">
              <p className="grid-1 none media-show">cpv</p>
              <p className="grid-1 media-none">cpv : {cpv} $</p>
              <input
                className="grid-1"
                type="range"
                onChange={(e) => {
                  setCpv(e.target.value);
                }}
                value={cpv}
                min="0.001"
                max="0.05"
                step="0.001"
              />
              <p className="grid-1 none media-show">csc</p>
              <p className="grid-1 media-none">{vsc} views to 1 sales</p>
              <input
                className="grid-1"
                type="range"
                onChange={(e) => {
                  setVsc(e.target.value);
                }}
                value={vsc}
                min="100"
                max="10000"
                step="100"
              />
              <p className="grid-1 none media-show">pp</p>
              <p className="grid-1 media-none">product price : {pp} $</p>
              <input
                className="grid-1"
                type="range"
                onChange={(e) => {
                  setPp(e.target.value);
                }}
                value={pp}
                min="1"
                max="100"
                step="1"
              />
            </div>
          </div>
        </div>
        <div className="rlt max-main-w opt">
          <div className="abs abs-cntr abs-l mg-l-1">
            <DropDownBtn title="Subs">
              <DropDownCustom q={"&sbmin=10000&sbmax=50000"} valStr="subs" val={subs} text="10~50K" />
              <DropDownCustom q={"&sbmin=50000&sbmax=100000"} valStr="subs" val={subs} text="50~100K" />
              <DropDownCustom q={"&sbmin=100000&sbmax=500000"} valStr="subs" val={subs} text="100~500K" />
              <DropDownCustom q={"&sbmin=500000&sbmax=1000000"} valStr="subs" val={subs} text="500K~1M" />
              <DropDownCustom q={"&sbmin=1000000"} valStr="subs" val={subs} text="1M" />
            </DropDownBtn>
            <DropDownBtn title="Avr View">
              <DropDownCustom q={"&avmin=10000&avmax=50000"} valStr="avrViews" val={avrViews} text="10~50K" />
              <DropDownCustom q={"&avmin=50000&avmax=100000"} valStr="avrViews" val={avrViews} text="50~100K" />
              <DropDownCustom q={"&avmin=100000&avmax=500000"} valStr="avrViews" val={avrViews} text="100~500K" />
              <DropDownCustom q={"&avmin=500000&avmax=1000000"} valStr="avrViews" val={avrViews} text="500K~1M" />
              <DropDownCustom q={"&avmin=1000000"} valStr="avrViews" val={avrViews} text="1M" />
            </DropDownBtn>
          </div>
        </div>
      </header>
      <div className="rlt max-main-w grid-cnt grid-gap">{channels}</div>
      <div className="rlt flex-cnt flex-h-cntr">
      {pageButtons}
      </div>
    </React.Fragment>
  );
};

export default Search;
