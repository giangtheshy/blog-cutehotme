import {
  CREATE,
  FETCH_ALL,
  DELETE,
  LIKE,
  UPDATE,
  GET_CURRENT_ID,
  GET_COMMENTS,
  CREATE_COMMENT,
  GET_POST,
  LIKE_SINGLE,
} from "../constants/actionTypes";

export default (postState = { posts: [], currentId: null, comments: [], post: {} }, action) => {
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
    case LIKE_SINGLE:
      return {
        ...postState,
        post: postState.post.likeCount.find((like) => like === action.payload.uid)
          ? { ...postState.post, likeCount: postState.post.likeCount.filter((like) => like !== action.payload.uid) }
          : { ...postState.post, likeCount: [...postState.post.likeCount, action.payload.uid] },
      };
    case GET_CURRENT_ID:
      return { ...postState, currentId: action.payload };
    case CREATE_COMMENT:
      return {
        ...postState,
        comments: [...postState.comments, action.payload],
        post: { ...postState.post, comments: [...postState.post.comments, action.payload._id] },
        posts: postState.posts.map((post) =>
          post._id === action.payload.pid ? { ...post, comments: [...post.comments, action.payload._id] } : post
        ),
      };
    case GET_COMMENTS:
      return { ...postState, comments: action.payload };
    case GET_POST:
      return { ...postState, post: action.payload };
    default:
      return postState;
  }
};
