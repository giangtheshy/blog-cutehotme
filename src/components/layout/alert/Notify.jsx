import React from "react";

import "./Notify.scss";

const Notify = ({ content, type }) => {
  return (
    <div className={`notify ${type}`}>
      <p>{content}</p>
    </div>
  );
};

export default Notify;
