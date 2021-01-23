import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import "./Post.scss";
import { deletePost, likePost, getCurrentId } from "../../../actions/post.action";

const Post = ({ _id, creator, title, message, tags, selectedFile, likeCount, createdAt, photoURL, userID }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const times = () => {
    const time = new Date().getTime() - new Date(createdAt).getTime();
    if (time / (1000 * 60 * 60 * 24 * 30) >= 1) {
      return `${Math.floor(time / (1000 * 60 * 60 * 24 * 30))} months ago`;
    } else if (time / (1000 * 60 * 60 * 24) >= 1) {
      return `${Math.floor(time / (1000 * 60 * 60 * 24))} days ago`;
    } else if (time / (1000 * 60 * 60) >= 1) {
      return `${Math.floor(time / (1000 * 60 * 60))} hours ago`;
    } else if (time / (1000 * 60) >= 1) {
      return `${Math.floor(time / (1000 * 60))} minutes ago`;
    } else {
      return "Just now";
    }
  };
  console.log(user._id);
  return (
    <article className="post">
      <div className="post__header">
        <div
          className="post-bg"
          style={{
            backgroundImage: `url(${
              selectedFile ||
              "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            })`,
          }}
        ></div>
        <div className="post__header-top">
          <div className="user-status">
            <img src={photoURL} alt="avatar" className="avatar" />
            <h3>{creator}</h3>
          </div>
          <button
            className={`edit-btn ${userID !== user._id && "disabled"}`}
            disabled={userID !== user._id ? true : false}
            onClick={() => dispatch(getCurrentId(_id))}
          >
            <HiOutlineDotsHorizontal />
          </button>
        </div>
        <p>{times()}</p>
      </div>
      <div className="post__content">
        <p className="tags">{tags.map((tag) => `#${tag}`)}</p>
        <h2 className="title">{title}</h2>
        <p className="message">{message}</p>
      </div>
      <div className="post__footer">
        <button
          className="like-btn"
          disabled={user._id ? false : true}
          onClick={() => dispatch(likePost(_id, user._id))}
        >
          {likeCount.find((like) => like === user._id) ? (
            <>
              <AiFillDislike /> Dislike {likeCount.length}
            </>
          ) : (
            <>
              <AiFillLike /> Like {likeCount.length}
            </>
          )}
        </button>
        <button
          className={`remove-btn ${userID !== user._id && "disabled"}`}
          onClick={() => dispatch(deletePost(_id))}
          disabled={userID !== user._id ? true : false}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </article>
  );
};

export default React.memo(Post);
