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
import { AuthContext } from "../firebase/FirebaseContext";
import { firebaseApp } from "../firebase/Firebase";

const Search = () => {
  const query = new URLSearchParams(window.location.search).get("q");
  const [channels, setChannels] = useState([]);
  const { chartIntData, setChartIntData, chartStrData, setChartStrData, channelData, setChannelData } = useContext(
    GlobalContext
  );
  const [csd, setCsd] = useState(chartStrData);
  const [cid, setCid] = useState(chartIntData);
  const [cpv, setCpv] = useState(5);
  const [vsc, setVsc] = useState(1000);
  const [pp, setPp] = useState(6000);
  const [subs, setSubs] = useState("");
  const [avrViews, setAvrViews] = useState("");
  const [totalViews, setTotalViews] = useState("");
  const [page, setPage] = useState(0);

  const currentUser = useContext(AuthContext);
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
    csd.splice(i, 1);
    setChartStrData(csd);
    setCsd(csd);

    chartIntData.splice(i, 1);
    setChartIntData([...chartIntData]);
    setCid(chartIntData);
  }

  const DropDownCustom = (props) => {
    return (
      <button
        onClick={() => {
          if (props.q === props.val) {
            if (props.valStr === "subs") setSubs("");
            if (props.valStr === "avrViews") setAvrViews("");
          } else {
            if (props.valStr === "subs") setSubs(props.q);
            if (props.valStr === "avrViews") setAvrViews(props.q);
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
    //header 에다가 uid 보내기
    fetch(
      `http://ec2-54-161-234-228.compute-1.amazonaws.com:3000/search?search=${query}${subs}${avrViews}${totalViews}&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        var pushChannels = [];
        for (let i = 0; i < Object.keys(json).length; i++) {
          try {
            pushChannels.push(
              <div
                className="grid-itm bgc-itm"
                key={i}
                onClick={() => {
                  if (!csd.includes(json[i].title) && csd.length <= 4) {
                    csd.push(json[i].title);
                    setChartStrData(csd);
                    setCsd(csd);
    
                    cid.push(Number(json[i].avr_views));
                    setChartIntData([...cid]);
                    setCid(cid);
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
                    <h1>{intFormat(json[i].subs, "명")}</h1>
                    <p className="mg-auto">구독자</p>
                  </div>
                  <div>
                    <h1>{intFormat(json[i].ttl_views, "회")}</h1>
                    <p className="mg-auto">총조회수</p>
                  </div>
                  <div>
                    <h1>{intFormat(json[i].avr_views, "회")}</h1>
                    <p className="mg-auto">평균조회수</p>
                  </div>
                </div>
                <hr className="hr-1" />
                <div className="grid-itm-info mg-t-8 mg-b-8">
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i])}>
                    <img src={twitchSvg} style={checkValidStyle(json[i])} alt="twitchSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i])}>
                    <img src={instagramSvg} style={checkValidStyle(json[i])} alt="instagramSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i])}>
                    <img src={facebookSvg} style={checkValidStyle(json[i])} alt="facebookSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i])}>
                    <img src={twitterSvg} style={checkValidStyle(json[i])} alt="twitterSvg"></img>
                  </button>
                  <button className="btn-svg">
                    <img src={emailSvg} style={checkValidStyle(getEmailFromString(json[i].about))} alt="emailSvg"></img>
                  </button>
                  <button className="btn-svg" onClick={() => openLinkIfValid(json[i].chan_url)}>
                    <img src={youtubeSvg} style={checkValidStyle(json[i].chan_url)} alt="youtubeSvg"></img>
                  </button>
                </div>
              </div>
            );
          } catch (e) {}
        }
        setChannels(pushChannels);
      });
  }, [query, subs, avrViews, totalViews, page, currentUser]);

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
          <p className="none media-show">cpc : 0.1$</p>
          <p className="none media-show">click sales conversion : 2%</p>
          <p className="none media-show">product price : 7$</p>
        </div>
        <div className="rlt max-main-w flex-cnt grid-gap">
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-b">
              <h1 className="mg-l-2">조회수</h1>
            </div>
            <div className="flex-itm-iner mg-auto">
              <BarChart yAxis="true" />
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-p">
              <h1 className="mg-l-2">광고비</h1>
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
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[0] * cpv, "")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-p" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[1], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[1] * cpv, "")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-o" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[2], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[2] * cpv, "")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-g" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[3], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[3] * cpv, "")}</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-s" />
              </div>
              <p className="grid-2 mg-auto">{intFormat(chartIntData[4], "")}</p>
              <p className="grid-3 mg-auto txt-dot">{intFormat(chartIntData[4] * cpv, "")}</p>

              <h2 className="grid-4 grid-4-val mg-auto txt-dot">
                {intFormat(
                  sumNaN(chartIntData[0], chartIntData[1], chartIntData[2], chartIntData[3], chartIntData[4]) * cpv,
                  ""
                )}
              </h2>
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-o">
              <h1 className="mg-l-2">총 매출</h1>
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
                    ""
                  )}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-g">
              <h1 className="mg-l-2">순수익</h1>
            </div>
            <div className="flex-itm-iner mg-t-0 flex-itm-grid mg-auto">
              <div className="grid-1"></div>
              <p className="grid-2 mg-auto">sales</p>
              <p className="grid-3 mg-auto">prof</p>
              <p className="grid-4 mg-auto">total</p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-b" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[0] / vsc) * pp, "")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[0] / vsc) * pp - chartIntData[0] * cpv, "", "0")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-p" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[1] / vsc) * pp, "")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[1] / vsc) * pp - chartIntData[1] * cpv, "", "0")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-o" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[2] / vsc) * pp, "")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[2] / vsc) * pp - chartIntData[2] * cpv, "", "0")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-g" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[3] / vsc) * pp, "")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[3] / vsc) * pp - chartIntData[3] * cpv, "", "0")}
              </p>

              <div className="grid-1">
                <i className="fas fa-square mg-auto c-s" />
              </div>
              <p className="grid-2 mg-auto">{intFormat((chartIntData[4] / vsc) * pp, "")}</p>
              <p className="grid-3 mg-auto txt-dot">
                {intFormat((chartIntData[4] / vsc) * pp - chartIntData[4] * cpv, "", "0")}
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
                  "0"
                )}
              </h2>
            </div>
          </div>
          <div className="flex-itm bgc-itm">
            <div className="flex-itm-ttl flex-h-cntr bgc-s">
              <h1 className="mg-l-2">옵션</h1>
            </div>
            <div className="flex-itm-iner mg-t-0 flex-itm-grid-2 txt-cnt mg-auto">
              <p className="grid-1 none media-show">cpv</p>
              <p className="grid-1 media-none">cpv : {cpv}</p>
              <input
                className="grid-1"
                type="range"
                onChange={(e) => {
                  setCpv(e.target.value);
                }}
                min="1"
                max="10"
                step="0.1"
              />
              <p className="grid-1 none media-show">csc</p>
              <p className="grid-1 media-none">{vsc} view to 1 sales</p>
              <input
                className="grid-1"
                type="range"
                onChange={(e) => {
                  setVsc(e.target.value);
                }}
                min="100"
                max="100000"
                step="100"
              />
              <p className="grid-1 none media-show">pp</p>
              <p className="grid-1 media-none">product price : {pp}</p>
              <input
                className="grid-1"
                type="range"
                onChange={(e) => {
                  setPp(e.target.value);
                }}
                min="1000"
                max="100000"
                step="100"
              />
            </div>
          </div>
        </div>
        <div className="rlt max-main-w opt">
          <div className="abs abs-cntr abs-l mg-l-1">
            <DropDownBtn title="구독자">
              <DropDownCustom q={"&sbmin=10000&sbmax=50000"} valStr="subs" val={subs} text="1~5만" />
              <DropDownCustom q={"&sbmin=50000&sbmax=100000"} valStr="subs" val={subs} text="5~10만" />
              <DropDownCustom q={"&sbmin=100000&sbmax=500000"} valStr="subs" val={subs} text="10~50만" />
              <DropDownCustom q={"&sbmin=500000&sbmax=1000000"} valStr="subs" val={subs} text="50~100만" />
              <DropDownCustom q={"&sbmin=1000000"} valStr="subs" val={subs} text="100+만" />
            </DropDownBtn>
            <DropDownBtn title="평균조회수">
              <DropDownCustom q={"&avmin=10000&avmax=50000"} valStr="avrViews" val={avrViews} text="1~5만" />
              <DropDownCustom q={"&avmin=50000&avmax=100000"} valStr="avrViews" val={avrViews} text="5~10만" />
              <DropDownCustom q={"&avmin=100000&avmax=500000"} valStr="avrViews" val={avrViews} text="10~50만" />
              <DropDownCustom q={"&avmin=500000&avmax=1000000"} valStr="avrViews" val={avrViews} text="50~100만" />
              <DropDownCustom q={"&avmin=1000000"} valStr="avrViews" val={avrViews} text="100+만" />
            </DropDownBtn>
          </div>
        </div>
      </header>
      <div className="rlt max-main-w grid-cnt grid-gap">{channels}</div>
      <div className="rlt flex-cnt flex-h-cntr">
        <button
          className="btn-1 mg-r-0 mg-b-1"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}
        >
          <h1>
            <i className="fas fa-angle-left" />
          </h1>
        </button>
        <button className="btn-1 mg-l-0 mg-r-0 mg-b-1">
          <h1>{page + 1}</h1>
        </button>
        <button
          className="btn-1 mg-b-1"
          onClick={() => {
              setPage(page+1);
          }}
        >
          <h1>
            <i className="fas fa-angle-right" />
          </h1>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Search;
