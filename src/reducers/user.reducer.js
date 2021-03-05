import {
  LOGIN,
  REGISTER,
  LOGOUT,
  CHECK_LOGIN,
  LOGIN_GOOGLE,
  ADD_FAVORITE,
  ADD_WATCHED,
  REMOVE_FAVORITE,
} from "../constants/actionTypes";

export default (userState = { user: {}, token: null }, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
    case REMOVE_FAVORITE:
    case ADD_WATCHED:
      return { user: {}, token: null };
    // return { ...userState, user: action.payload };
    case LOGIN:
    case LOGIN_GOOGLE:
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
