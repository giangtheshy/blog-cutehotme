import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IoIosSend } from "react-icons/io";
import "./Comments.scss";
import moment from "../../../utils/functions/moment";
import { createComment } from "../../../actions/post.action";

const Comments = ({ comments, id }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      dispatch(
        createComment(id, {
          uid: user._id,
          displayName: user.displayName,
          photoURL: user.photoURL,
          message: value,
          pid: id,
        })
      );
      setValue("");
    }
  };
  if (!user) return <></>;
  return (
    <section className="comments">
      {user?._id && (
        <form onSubmit={handleSubmit}>
          <img src={user.photoURL} alt="avatar" className="avatar" />
          <label htmlFor="value" className={`value ${value === "" ? null : "focus"}`}>
            <input type="text" id="value" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
          <button type="submit">
            <IoIosSend />
          </button>
        </form>
      )}
      <div className="comments-container">
        {comments
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((comment) => (
            <article className="comment" key={comment._id}>
              <img src={comment.photoURL} alt="avatar" className="avatar" />
              <div className="content">
                <div className="content__top">
                  <h4 className="name">{comment.displayName}</h4>
                  <small className="time">{moment(comment.createdAt)}</small>
                </div>
                <div className="message">
                  <p>{comment.message}</p>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default Comments;
