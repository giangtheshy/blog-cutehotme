import { combineReducers } from "redux";

import posts from "./post.reducer";
import users from "./user.reducer";
import chat from "./chat.reducer";

export const reducers = combineReducers({ posts, users, chat });
