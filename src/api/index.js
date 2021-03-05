import axios from "./axios";

export const getPosts = () => axios.get("/api/posts");
export const createPost = (post) => axios.post("/api/posts", post);
export const deletePost = (id) => axios.delete(`api/posts/${id}`);
export const likePost = (id, uid) => axios.patch(`/api/posts/like?id=${id}&uid=${uid}`);
export const updatePost = (id, post) => axios.patch(`/api/posts/${id}`, post);

export const loginUser = (user) => axios.post("/api/users/login", user);
export const registerUser = (user) => axios.post("/api/users/register", user);
export const deleteUser = (id) => axios.delete(`/api/users/${id}`);
export const getUser = (token) => axios.get("/api/users", { headers: { "x-auth-token": token } });
export const checkLogin = (token) =>
  axios.post("/api/users/isValidToken", null, { headers: { "x-auth-token": token } });
export const loginGoogle = (user) => axios.post("/api/users/loginGoogle", user);
export const getSinglePost = (id) => axios.get(`/api/post/${id}`);
export const createComment = (id, comment) => axios.post(`/api/comments/${id}`, comment);
export const getComments = (id) => axios.get(`/api/comments/${id}`);
