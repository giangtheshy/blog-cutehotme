import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import "./Posts.scss";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <div className="posts">
      {posts
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => (
          <Post key={post._id} {...post} />
        ))}
    </div>
  );
};

export default React.memo(Posts);
