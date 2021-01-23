import { LOGIN, REGISTER, DELETE_USER, GET_USER, LOGOUT, CHECK_LOGIN } from "../constants/actionTypes";
import * as api from "../api";

export const registerUser = (user, setCookies) => async (dispatch) => {
  try {
    await api.registerUser(user);
    const { data } = await api.loginUser({ email: user.email, password: user.password });
    await setCookies("user", data.token, { path: "/" });
    dispatch({ type: REGISTER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = (user, setCookies) => async (dispatch) => {
  try {
    const { data } = await api.loginUser({ email: user.email, password: user.password });
    await setCookies("user", data.token, { path: "/" });
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    return error.response.data.message;
  }
};
export const logoutUser = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
export const checkLogin = (token) => async (dispatch) => {
  try {
    if (token) {
      const check = await api.checkLogin(token);
      if (check.data) {
        const { data } = await api.getUser(token);
        dispatch({ type: CHECK_LOGIN, payload: { data, token } });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
