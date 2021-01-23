import { LOGIN, REGISTER, DELETE_USER, GET_USER, LOGOUT, CHECK_LOGIN } from "../constants/actionTypes";

export default (userState = { user: {}, token: null }, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return action.payload;
    case LOGOUT:
      return { user: {}, token: null };
    case CHECK_LOGIN:
      return { user: action.payload.data, token: action.payload.token };
    default:
      return userState;
  }
};
