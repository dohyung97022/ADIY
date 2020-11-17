import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import Main from "./router/main";
import Search from "./router/search";
import Channel from "./router/channel";
import Why from "./router/why";
import Login from "./router/login";
import SignUp from "./router/sign-up";
import SignIn from "./router/sign-in";
import Payment from "./router/payment";
import Profile from "./router/profile";
import PayInfo from "./router/pay-info";
import { AuthContextProvider } from "./firebase/FirebaseContext";
import {NeedLoggedInRoute, NeedLoggedOutRoute} from "./firebase/FirebaseRoutes";

export const GlobalContext = createContext(null);

const Index = () => {
  const [input, setInput] = useState("");
  const [chartIntData, setChartIntData] = useState([]);
  const [chartStrData, setChartStrData] = useState([]);
  const [channelData, setChannelData] = useState();
  //사용방법
  // import { GlobalContext } from "../index";
  // const { cfv } = useContext(GlobalContext);

  return (
    <Router>
      <Switch>
      <AuthContextProvider>
        <GlobalContext.Provider
          value={{
            input,
            setInput,
            chartIntData,
            setChartIntData,
            chartStrData,
            setChartStrData,
            channelData,
            setChannelData,
          }}
        >
          <Route path="/" exact component={Main} />
          <Route path="/search" component={Search} />
          <Route path="/channel" component={Channel} />
          <Route path="/why" component={Why} />
          <NeedLoggedOutRoute path="/signin" redirect="/" component={SignIn} />
          <NeedLoggedOutRoute path="/signup" redirect="/" component={SignUp} />
          <Route path="/payment" component={Payment} />
          <Route path="/profile" component={Profile} />
          <Route path="/payinfo" component={PayInfo} />
        </GlobalContext.Provider>
        </AuthContextProvider>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

