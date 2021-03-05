import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaTrash, FaComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Post.scss";
import { deletePost, likePost, getCurrentId, likePostSingle } from "../../../actions/post.action";
import Button from "../../../utils/elements/Button/Button";
import moment from "../../../utils/functions/moment";

const Post = ({
  _id,
  creator,
  title,
  message,
  tags,
  selectedFile,
  likeCount,
  createdAt,
  photoURL,
  userID,
  comments,
  single,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.users.user);

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
          {userID === user._id && (
            <button
              className={`edit-btn ${userID !== user._id && "disabled"}`}
              disabled={userID !== user._id ? true : false}
              onClick={() => {
                dispatch(getCurrentId(_id));
                if (single) {
                  history.push("/");
                }
              }}
            >
              <HiOutlineDotsHorizontal />
            </button>
          )}
        </div>
        <p>{moment(createdAt)}</p>
      </div>
      <div className="post__content">
        <p className="tags">{tags.map((tag) => `#${tag}`)}</p>
        <h2 className="title">{title}</h2>
        <p className="message">{message}</p>
      </div>
      <div className="post__footer">
        <Button
          count={likeCount.length}
          text="Like"
          Icon={likeCount.find((like) => like === user._id) ? AiOutlineLike : AiFillLike}
          onClick={() => {
            if (single === true) {
              dispatch(likePostSingle(_id, user._id));
            }
            dispatch(likePost(_id, user._id));
          }}
          disabled={user._id ? false : true}
        />
        <Button count={comments.length} text="" Icon={FaComment} onClick={() => history.push(`/post/${_id}`)} />
        <button
          className={`remove-btn ${userID !== user._id && "disabled"}`}
          onClick={() => {
            dispatch(deletePost(_id));
            if (single) {
              history.push("/");
            }
          }}
          disabled={userID !== user._id ? true : false}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default React.memo(Post);
