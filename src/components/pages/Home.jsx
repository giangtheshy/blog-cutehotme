import React, { useState } from "react";
import Posts from "../Posts/Posts";
import ToolsBar from "../chat/Tools/ToolsBar/ToolsBar";
import Form from "../Form/Form";
import Chat from "../chat/Chat";
const Home = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <section className="app__content">
      <Posts />
      <Form />
      <ToolsBar setShowChat={setShowChat} showChat={showChat} />
      {showChat && <Chat />}
    </section>
  );
};

export default Home;
