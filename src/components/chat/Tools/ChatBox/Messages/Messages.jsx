import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.scss";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <ScrollToBottom className="messages" initialScrollBehavior="auto" debug={false}>
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
