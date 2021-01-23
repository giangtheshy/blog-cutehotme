import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FiSend } from "react-icons/fi";
import "./Footer.scss";
const Footer = () => {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.users.user);
  const socket = useSelector((state) => state.chat.socket);
  const room = useSelector((state) => state.chat.room);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message: { message: text, uid: user._id, displayName: user.displayName }, room });

    setText("");
  };
  return (
    <div className="footer-chat-box">
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} placeholder="enter ..." onChange={(e) => setText(e.target.value)} />
        <button type="submit">
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default Footer;
