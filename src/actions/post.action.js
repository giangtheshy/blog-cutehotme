import {
  CREATE,
  FETCH_ALL,
  DELETE,
  LIKE,
  UPDATE,
  GET_CURRENT_ID,
  CREATE_COMMENT,
  GET_COMMENTS,
  GET_POST,
  LIKE_SINGLE,
} from "../constants/actionTypes";
import * as api from "../api";

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.error(error);
  }
};
export const fetchPost = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.error(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id, uid) => async (dispatch) => {
  try {
    dispatch({ type: LIKE, payload: { id, uid } });
    await api.likePost(id, uid);
  } catch (error) {
    console.log(error);
  }
};
export const likePostSingle = (id, uid) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_SINGLE, payload: { id, uid } });
    await api.likePost(id, uid);
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getCurrentId = (id) => (dispatch) => {
  try {
    dispatch({ type: GET_CURRENT_ID, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const createComment = (id, comment) => async (dispatch) => {
  try {
    const { data } = await api.createComment(id, comment);
    dispatch({ type: CREATE_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getComments = (id) => async (dispatch) => {
  try {
    const { data } = await api.getComments(id);
    dispatch({ type: GET_COMMENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getSinglePost = (id) => async (dispatch) => {
  try {
    if (!id) {
      dispatch({ type: GET_POST, payload: {} });
    } else {
      const { data } = await api.getSinglePost(id);
      dispatch({ type: GET_POST, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
};
