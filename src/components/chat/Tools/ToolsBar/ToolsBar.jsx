import React from "react";
import "./ToolsBar.scss";

const ToolsBar = ({ setShowChat, showChat }) => {
  return (
    <div className="tools-bar">
      <button className="open-chat" onClick={() => setShowChat((prev) => !prev)}>
        {showChat ? "Close Chat" : "Open Chat"}
      </button>
    </div>
  );
};

export default ToolsBar;
