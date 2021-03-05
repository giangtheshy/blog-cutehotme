import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getComments, getSinglePost } from "../../actions/post.action";
import Post from "../Posts/Post/Post";
import Comments from "../layout/Comments/Comments";

const PostPage = () => {
  const comments = useSelector((state) => state.posts.comments);
  const posts = useSelector((state) => state.posts.posts);
  const post = useSelector((state) => state.posts.post);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getComments(id));
    dispatch(getSinglePost(id));
  }, []);
  if (!Object.keys(post).length) return <></>;
  return (
    <div>
      {posts.length === 0 ? (
        <Post {...post} single={true} />
      ) : (
        <Post {...posts.find((post) => post._id === id)} single={true} />
      )}
      <Comments comments={comments} id={id} />
    </div>
  );
};

export default PostPage;
