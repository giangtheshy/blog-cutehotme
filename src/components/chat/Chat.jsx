import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBarChat from "./Tools/SideBar/SideBarChat";
import ChatBox from "./Tools/ChatBox/ChatBox";
import "./Chat.scss";

const Chat = () => {
  const [, updateState] = useState();
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.users.user);
  const socket = useSelector((state) => state.chat.socket);
  useEffect(() => {
    console.log("chat");
    socket.emit("init", (rooms) => {
      setRooms(rooms);
    });
    return () => socket.off("init");
  }, []);

  return (
    <section className="chat-overlay">
      <SideBarChat rooms={rooms} setRooms={setRooms} />
      <ChatBox />
    </section>
  );
};

export default Chat;
