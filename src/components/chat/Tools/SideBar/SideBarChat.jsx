import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./SideBarChat.scss";
import Room from "./Room/Room";

const SideBarChat = ({ rooms, setRooms }) => {
  const [value, setValue] = useState("");
  const socket = useSelector((state) => state.chat.socket);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.on("room", (room) => {
      if (room.error) {
        alert("Room has already existed");
      } else {
        setRooms((prev) => [...prev, room]);
      }
    });
    if (value) {
      socket.emit("create-room", value);
    }
    setValue("");
  };
  if (!rooms) return <></>;
  return (
    <aside className="sidebar">
      <h3>Rooms</h3>
      <div className="room-container">
        {rooms.map((room) => (
          <Room key={room._id} room={room} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label className={`title ${value === "" ? null : "focus"}`}>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <button type="submit">Create Room</button>
      </form>
    </aside>
  );
};

export default SideBarChat;
