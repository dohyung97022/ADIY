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
import Payment from "./router/payment";

import "chartjs-plugin-datalabels";

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
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/payment" component={Payment} />
        </GlobalContext.Provider>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
