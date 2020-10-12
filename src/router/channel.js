import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../index";
import { getEmailFromString, openLinkIfValid, decode, intFormat, sumNaN, checkValidStyle } from "../functions/tools";
import brandImg from "../img/brand-36.png";
import thumbnailImg from "../img/thumbnail.png";
import emailSvg from "../social-media-svg/email.svg";
import facebookSvg from "../social-media-svg/facebook.svg";
import instagramSvg from "../social-media-svg/instagram.svg";
import twitchSvg from "../social-media-svg/twitch.svg";
import twitterSvg from "../social-media-svg/twitter.svg";
import youtubeSvg from "../social-media-svg/youtube.svg";
import BarChart from "../chart/bar";
import DoughnutChart from "../chart/doughnut";
import HalfDoughnutChart from "../chart/halfdoughnut";
import SearchBar from "../components/search-bar";

const Channel = () => {
  const query = new URLSearchParams(window.location.search).get("q");
  const [channelDataComponent, setChannelDataComponent] = useState();
  const [videos, setVideos] = useState();
  const [json, setJson] = useState();
  useEffect(() => {
    fetch("http://ec2-52-5-15-14.compute-1.amazonaws.com:3000/video?channel=" + query)
      .then((res) => res.json())
      .then((json) => {
        setJson(json);
        console.log(json);
      });
  }, [query]);

  useEffect(() => {
    if (json === undefined) {
      return;
    }
    setChannelDataComponent(
      <React.Fragment>
        <div className="rlt mg-t-3">
          <img className="rlt flex-cnt cnl-img" src={json["channel"].chan_img} alt="brandImg" />
          <h1 className="txt-cnt h1-fix mg-b-1">{json["channel"].title}</h1>
        </div>
        <div className="flex-cnt txt-cnt mg-t-0 grid-itm-info">
          <div>
            <h1>{intFormat(json["channel"].subs, "명")}</h1>
            <p>구독자</p>
          </div>
          <div>
            <h1>{intFormat(json["channel"].ttl_views, "명")}</h1>
            <p>총조회수</p>
          </div>
          <div>
            <h1>{intFormat(json["channel"].avr_views, "명")}</h1>
            <p>평균조회수</p>
          </div>
        </div>
        <div className="rlt flex-cnt mg-t-1 mg-b-1">
          <button className="btn-4 btn-svg w-1 mg-r-0 mg-l-0" onClick={() => openLinkIfValid()}>
            <img src={twitchSvg} style={checkValidStyle()} alt="twitchSvg"></img>
          </button>
          <button className="btn-4 btn-svg w-1 mg-r-0 mg-l-0" onClick={() => openLinkIfValid()}>
            <img src={instagramSvg} style={checkValidStyle()} alt="instagramSvg"></img>
          </button>
          <button className="btn-4 btn-svg w-1 mg-r-0 mg-l-0" onClick={() => openLinkIfValid()}>
            <img src={facebookSvg} style={checkValidStyle()} alt="facebookSvg"></img>
          </button>
          <button className="btn-4 btn-svg w-1 mg-r-0 mg-l-0" onClick={() => openLinkIfValid()}>
            <img src={twitterSvg} style={checkValidStyle()} alt="twitterSvg"></img>
          </button>
          <button className="btn-4 btn-svg w-1 mg-r-0 mg-l-0">
            <img src={emailSvg} style={checkValidStyle(getEmailFromString(json["channel"].about))} alt="emailSvg"></img>
          </button>
          <button className="btn-4 btn-svg w-1 mg-r-0 mg-l-0" onClick={() => openLinkIfValid(json["channel"].chan_url)}>
            <img src={youtubeSvg} style={checkValidStyle(json["channel"].chan_url)} alt="youtubeSvg"></img>
          </button>
        </div>
      </React.Fragment>
    );
    var v = [];
    for (let i = 0; i < Object.keys(json["videos"]).length - 1; i++) {
      v.push(
        <div className="txt-cnt mg-t-1 bgc-itm" key={i}>
          <img className="w-100" src={json["videos"][i].Thumbs[1]} alt="thumbnailImg"></img>
          <p className="w-100 mg-t-0 txt-dot c-font-3 mg-l-0">{decode(json["videos"][i].VidTitle)}</p>
          <div className="w-100 flex-cnt mg-t-0">
            <div className="media-cnl-txt w-50">
              <p className="w-50 c-font-3">조회수</p>
              <p className="w-50">{intFormat(json["videos"][i].ViewCount, "회")}</p>
            </div>
            <div className="media-cnl-txt w-50">
              <p className="w-50 c-font-3">댓글</p>
              <p className="w-50">{intFormat(json["videos"][i].CommentsCount, "개")}</p>
            </div>
          </div>
          <div className="w-100 flex-cnt mg-t-0 mg-b-0">
            <div className="media-cnl-txt w-50">
              <p className="w-50 c-font-3">좋아요</p>
              <p className="w-50">{intFormat(json["videos"][i].Likes, "")}</p>
            </div>
            <div className="media-cnl-txt w-50">
              <p className="w-50 c-font-3">싫어요</p>
              <p className="w-50">{intFormat(json["videos"][i].Dislikes, "")}</p>
            </div>
          </div>
        </div>
      );
    }
    setVideos(v);

    const Likes = [];
    for (let i = 0; i < Object.keys(json["videos"]).length; i++) {
      Likes.push(json["videos"][i].Likes);
    }
    console.log(sumNaN(...Likes));

    const Dislikes = [];
    for (let i = 0; i < Object.keys(json["videos"]).length; i++) {
      Dislikes.push(json["videos"][i].Dislikes);
    }
    console.log(sumNaN(...Dislikes));

    const CommentsCount = [];
    for (let i = 0; i < Object.keys(json["videos"]).length; i++) {
      CommentsCount.push(json["videos"][i].CommentsCount);
    }
    console.log(sumNaN(...CommentsCount));

    const ViewCount = [];
    for (let i = 0; i < Object.keys(json["videos"]).length; i++) {
      ViewCount.push(json["videos"][i].ViewCount);
    }
    console.log(sumNaN(...ViewCount) - sumNaN(...Likes) - sumNaN(...Dislikes) - sumNaN(...CommentsCount));
  }, [json]);

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
            <button className="btn-1 mg-r-2">로그인</button>
            <button className="btn-1 mg-r-2">가입</button>
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
      {channelDataComponent}
      <div className="flex-cnt txt-cnt mg-t-1 grid-cnl-chart grid-gap">
        <div className="bgc-itm">
          <div className="grid-cnl-item-chart mg-t-1">
            <BarChart yDisplay="false" xDisplay="false" />
          </div>
          <p className="mg-t-1">키워드</p>
          <div className="flex-cnt mg-t-0 flex-wrap">
            <p>
              <i className="fas fa-square mg-r-0 c-b" />
              공포게임
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-p" />
              팬아트
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-o" />
              풍월량
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-g" />
              게임
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-s" />
              이게 넘어가면
            </p>
          </div>
        </div>
        <div className="bgc-itm">
          <div className="grid-cnl-item-chart mg-t-1">
            <BarChart yDisplay="false" xDisplay="false" />
          </div>
          <p className="mg-t-1">체널지수</p>
          <div className="flex-cnt mg-t-0 flex-wrap">
            <p>
              <i className="fas fa-square mg-r-0 c-b" />
              성장지수
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-p" />
              방문지수
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-o" />
              경험지수
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-g" />
              시청률 지수
            </p>
          </div>
        </div>
        <div className="bgc-itm">
          <div className="grid-cnl-item-chart mg-t-1">
            <DoughnutChart yDisplay="false" xDisplay="false" />
          </div>
          <p className="mg-t-1">참여율</p>
          <div className="flex-cnt mg-t-0 flex-wrap">
            <p>
              <i className="fas fa-square mg-r-0 c-b" />
              좋아요
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-p" />
              싫어요
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-o" />
              댓글
            </p>
            <p>
              <i className="fas fa-square mg-r-0 c-g" />
              유령
            </p>
          </div>
        </div>
        <div className="bgc-itm mg-t-1">
          <div className="grid-cnl-item-chart mg-t-1">
            <HalfDoughnutChart yDisplay="false" xDisplay="false" />
          </div>
          <h1 className="mg-t-1 c-font-2 mg-b-2">영상평가</h1>
        </div>
        <div className="bgc-itm mg-t-1">
          <div className="grid-cnl-item-chart mg-t-1">
            <HalfDoughnutChart yDisplay="false" xDisplay="false" />
          </div>
          <h1 className="mg-t-1 c-font-2 mg-b-2">참여율</h1>
        </div>
        <div className="bgc-itm mg-t-1">
          <div className="grid-cnl-item-chart mg-t-1">
            <HalfDoughnutChart yDisplay="false" xDisplay="false" />
          </div>
          <h1 className="mg-t-1 c-font-2 mg-b-2">최근 시청률</h1>
        </div>
      </div>
      <div className="rlt max-channel-w grid-vid-cnt grid-gap">{videos}</div>
    </React.Fragment>
  );
};

export default Channel;
