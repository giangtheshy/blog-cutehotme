import { CREATE, FETCH_ALL, DELETE, LIKE, UPDATE, GET_CURRENT_ID } from "../constants/actionTypes";

export default (postState = { posts: [], currentId: null }, action) => {
  switch (action.type) {
    case CREATE:
      return { ...postState, posts: [...postState.posts, action.payload] };
    case FETCH_ALL:
      return { ...postState, posts: action.payload };
    case DELETE:
      return { ...postState, posts: postState.posts.filter((post) => post._id !== action.payload) };
    case UPDATE:
      return {
        ...postState,
        posts: postState.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    case LIKE:
      return {
        ...postState,
        posts: postState.posts.map((post) =>
          post._id === action.payload.id
            ? post.likeCount.find((like) => like === action.payload.uid)
              ? { ...post, likeCount: post.likeCount.filter((like) => like !== action.payload.uid) }
              : { ...post, likeCount: [...post.likeCount, action.payload.uid] }
            : post
        ),
      };
    case GET_CURRENT_ID:
      return { ...postState, currentId: action.payload };
    default:
      return postState;
  }
};
