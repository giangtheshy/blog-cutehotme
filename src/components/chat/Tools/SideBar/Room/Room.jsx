import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Room.scss";
import { setRoom, getMessages } from "../../../../../actions/chat.action";
import { GoPrimitiveDot } from "react-icons/go";
import { AiFillEye } from "react-icons/ai";

const Room = ({ room }) => {
  const user = useSelector((state) => state.users.user);
  const socket = useSelector((state) => state.chat.socket);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setRoom(room.name));
    socket.emit("join", { _user: user, room: room.name }, (error) => {
      console.log(error);
    });
    socket.emit("getMessage", room.name, (messages) => {
      dispatch(getMessages(messages));
    });
  };
  console.log(room);
  return (
    <article key={room._id} onClick={handleClick} className="room">
      <div className="room-name">
        <p>{room.name}</p>
      </div>
      <div className="room-details">
        <span className="online">
          <GoPrimitiveDot className="icon-online" />
          {room.users.length > 1000 ? `${room.users.length / 1000}k` : room.users.length} online
        </span>
        <span className="total">
          <AiFillEye className="icon-total" />
          {room.counter > 1000 ? `${room.counter / 1000}k` : room.counter} views
        </span>
      </div>
    </article>
  );
};

export default React.memo(Room);
