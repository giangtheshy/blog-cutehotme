import React, { useState } from "react";
import { useSelector } from "react-redux";

import Posts from "../Posts/Posts";
import ToolsBar from "../chat/Tools/ToolsBar/ToolsBar";
import Form from "../Form/Form";
import Chat from "../chat/Chat";
const Home = () => {
  const [showChat, setShowChat] = useState(false);
  const user = useSelector((state) => state.users.user);

  return (
    <section className="app__content">
      <Posts />
      {Object.keys(user).length ? (
        <Form />
      ) : (
        <h1 style={{ width: "35%", textAlign: "center", color: "white", marginTop: "5rem" }}>
          Must login to post and chat!
        </h1>
      )}
      {Object.keys(user).length ? <ToolsBar setShowChat={setShowChat} showChat={showChat} /> : null}
      {showChat && <Chat />}
    </section>
  );
};

export default Home;
