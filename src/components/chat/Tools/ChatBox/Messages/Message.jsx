import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactEmoji from "react-emoji";

const Message = ({ message }) => {
  const user = useSelector((state) => state.users.user);
  const [showMess, setShowMess] = useState(true);
  useEffect(() => {
    let timer;
    if (message.uid === "admin") {
      timer = setTimeout(() => {
        setShowMess(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [message]);
  var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  };
  return (
    <>
      {showMess && (
        <article className={`message-center ${user._id !== message.uid ? "normal" : "myself"}`}>
          <div>
            <span
              style={message.uid !== "admin" ? { color: `${stringToColour(message.uid)}` } : { color: "red" }}
              className={`name ${message.uid === "admin" ? "admin" : "user"}`}
            >
              {message.displayName} :{" "}
            </span>
            <span className="message">{ReactEmoji.emojify(message.message)}</span>
          </div>
        </article>
      )}
    </>
  );
};

export default Message;
