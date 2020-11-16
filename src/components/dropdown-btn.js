import React from "react";
import "./dropdown-btn.css";
//puts props children if included
//props.type = param/payment
const dropDownButton = (props) => {
  const type = props.type;
  var classAddText = "drp-dwn-param";
  if (type === "param") {
    classAddText = "drp-dwn-param";
  } else if (type === "payment") {
    classAddText = "drp-dwn-payment";
  }
  return (
    <div className={"rlt inl-blc " + classAddText}>
      <button className="btn-1 drp-dwn-btn">
        {props.title}
        <i className="fas fa-angle-down"></i>
      </button>
      <div className="abs abs-l abs-r drp-dwn-cnt none z-i-1">{props.children}</div>
    </div>
  );
};

export default dropDownButton;
