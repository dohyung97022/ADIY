import React, { useContext } from "react";
import "./search-bar.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../src/index";
const SearchBar = () => {
  const { input, setInput } = useContext(GlobalContext);
  return (
    <div className="srch-bar flx-h-cntr flex-sp-bt">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mg-l-1"
      />
      <div className="mg-r-1 flex-cnt">
        <button
          whilehover={{
            scale: 1.2,
          }}
          className="srch-bar-icn mg-r-1"
          onClick={() => {}}
        >
          <i className="fa fa-cog" aria-hidden="true"></i>
        </button>
        <Link to={"/search?q=" + input}>
          <button
            whilehover={{
              scale: 1.2,
            }}
            className="srch-bar-icn"
            onClick={() => {}}
          >
            <i className="fas fa-search"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
