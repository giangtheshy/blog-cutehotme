import { SET_ROOM, SET_SOCKET, ADD_MESSAGE, GET_MESSAGES } from "../constants/actionTypes";
export default (chat = { room: "", socket: null, messages: [] }, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...chat, socket: action.payload };
    case SET_ROOM:
      return { ...chat, room: action.payload };
    case ADD_MESSAGE:
      return { ...chat, messages: [...chat.messages, action.payload] };
    case GET_MESSAGES:
      return { ...chat, messages: action.payload };
    default:
      return chat;
  }
};
