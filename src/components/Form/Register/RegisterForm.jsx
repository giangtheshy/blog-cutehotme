import React, { useState } from "react";
import { useCookies } from "react-cookie";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../actions/user.action";
import "./RegisterForm.scss";

const LoginForm = () => {
  const [_, setCookies] = useCookies(["user"]);
  const [userData, setUserData] = useState({
    email: "",
    displayName: "",
    password: "",
    photoURL: null,
    passwordCheck: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userData.displayName !== "" &&
      userData.email !== "" &&
      userData.password !== "" &&
      userData.photoURL !== "" &&
      userData.passwordCheck !== ""
    ) {
      dispatch(registerUser(userData, setCookies));
    } else {
      alert("Please Fill in full fields");
    }
    setUserData({ email: "", displayName: "", password: "", photoURL: null, passwordCheck: "" });
  };
  return (
    <div className="form">
      <h4 className="form__title">Register</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="display-name" className={`display-name ${userData.displayName === "" ? null : "focus"}`}>
          <input
            type="text"
            id="display-name"
            value={userData.displayName}
            onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
          />
        </label>
        <label htmlFor="email" className={`email ${userData.email === "" ? null : "focus"}`}>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </label>
        <label htmlFor="password" className={`password ${userData.password === "" ? null : "focus"}`}>
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
        </label>
        <label htmlFor="password-check" className={`password-check ${userData.passwordCheck === "" ? null : "focus"}`}>
          <input
            type="password"
            id="password-check"
            value={userData.passwordCheck}
            onChange={(e) => setUserData({ ...userData, passwordCheck: e.target.value })}
          />
        </label>
        <label htmlFor="photo-url" className="photo-url">
          <FileBase
            type="file"
            id="photo-url"
            onDone={({ base64 }) => setUserData({ ...userData, photoURL: base64 })}
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

export default LoginForm;
