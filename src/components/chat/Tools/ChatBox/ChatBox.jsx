import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ChatBox.scss";
import Footer from "./Footer/Footer";
import { addMessage } from "../../../../actions/chat.action";
import Messages from "./Messages/Messages";

const ChatBox = () => {
  const socket = useSelector((state) => state.chat.socket);
  const messages = useSelector((state) => state.chat.messages);
  const room = useSelector((state) => state.chat.room);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });
    return () => socket.off("message");
  }, []);
  console.log(messages);
  return (
    <div className="chat-box">
      <h1>{room} </h1>

      <Messages messages={messages} />

      <Footer />
    </div>
  );
};

export default ChatBox;
