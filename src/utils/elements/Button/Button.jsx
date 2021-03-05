import React from "react";
import "./Button.scss";

const Button = ({ Icon, count, text, onClick, disabled, type }) => {
  return (
    <button className={`btn-double ${type}`} onClick={onClick} disabled={disabled}>
      <span className="icon-center">
        <Icon className="icon" />
        {text}
      </span>
      <span className="detail">{count && count}</span>
    </button>
  );
};

export default Button;
