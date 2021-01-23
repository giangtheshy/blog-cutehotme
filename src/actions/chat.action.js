import { SET_ROOM, SET_SOCKET, ADD_MESSAGE, GET_MESSAGES } from "../constants/actionTypes";

export const setRoom = (room) => (dispatch) => {
  try {
    dispatch({ type: SET_ROOM, payload: room });
  } catch (error) {
    console.log(error);
  }
};

export const setSocket = (socket) => (dispatch) => {
  try {
    dispatch({ type: SET_SOCKET, payload: socket });
  } catch (error) {
    console.log(error);
  }
};
export const addMessage = (message) => (dispatch) => {
  try {
    dispatch({ type: ADD_MESSAGE, payload: message });
  } catch (error) {
    console.log(error);
  }
};
export const getMessages = (messages) => (dispatch) => {
  try {
    dispatch({ type: GET_MESSAGES, payload: messages });
  } catch (error) {
    console.log(error);
  }
};
