import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import "./Form.scss";
import { createPost, updatePost, getCurrentId } from "../../actions/post.action";
import Notify from "../layout/alert/Notify";

const Form = () => {
  const [postData, setPostData] = useState({ title: "", message: "", selectedFile: null, tags: [] });
  const [notify, setNotify] = useState({ content: "", type: "" });
  const [showNotify, setShowNotify] = useState(false);

  const currentId = useSelector((state) => state.posts.currentId);
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentId) {
      const { title, message, selectedFile, tags } = posts.find((post) => post._id === currentId);
      setPostData({ title, message, selectedFile, tags });
    }
  }, [currentId]);
  useEffect(() => {
    const alert = setTimeout(() => {
      setShowNotify(false);
    }, 2000);
    return () => clearTimeout(alert);
  }, [showNotify]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user._id) {
      if (
        postData.title !== "" &&
        postData.message !== "" &&
        postData.selectedFile !== "" &&
        postData.tags.length !== 0
      ) {
        const newPostData = { ...postData, creator: user.displayName, photoURL: user.photoURL, userID: user._id };
        if (currentId) {
          dispatch(updatePost(currentId, newPostData));
          dispatch(getCurrentId(null));
          setShowNotify(true);
          setNotify({ content: "Modify success", type: "success" });
        } else {
          dispatch(createPost(newPostData));
          setShowNotify(true);
          setNotify({ content: "Post success", type: "success" });
        }
      } else {
        setShowNotify(true);
        setNotify({ content: "Some fields not fill in", type: "danger" });
      }
    } else {
      setShowNotify(true);
      setNotify({ content: "Must login to post", type: "danger" });
    }
    setPostData({ title: "", message: "", selectedFile: null, tags: [] });
  };

  return (
    <div className="form">
      <h4 className="form__title">{currentId ? "Editing" : "Creating"} Post</h4>
      {showNotify && <Notify content={notify.content} type={notify.type} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className={`title ${postData.title === "" ? null : "focus"}`}>
          <input
            type="text"
            id="title"
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
        </label>
        <label htmlFor="message" className={`message ${postData.message === "" ? null : "focus"}`}>
          <input
            type="text"
            id="message"
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
        </label>
        <label htmlFor="tags" className={`tags ${postData.tags.length === 0 ? null : "focus"}`}>
          <input
            type="text"
            id="tags"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
          />
        </label>
        <label htmlFor="selectedFile" className="selectedFile">
          <FileBase
            type="file"
            id="selectedFile"
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
            multiple={false}
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default React.memo(Form);
