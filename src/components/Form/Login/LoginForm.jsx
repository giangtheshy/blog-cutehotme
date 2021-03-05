import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";

import { loginUser, loginGoogle } from "../../../actions/user.action";
import "./LoginForm.scss";
import Notify from "../../layout/alert/Notify";

const LoginForm = () => {
  const [cookies, setCookies] = useCookies(["user"]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [notify, setNotify] = useState({ content: "", type: "" });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const alert = setTimeout(() => {
      setNotify({ content: "", type: "" });
    }, 4000);
    return () => clearTimeout(alert);
  }, [notify]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.email !== "" && userData.password !== "") {
      try {
        const message = await dispatch(loginUser(userData, setCookies));
        if (!message) {
          history.push("/");
        } else {
          setNotify({ content: message, type: "danger" });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setNotify({ content: "must fill in full fields", type: "danger" });
    }
    setUserData({ email: "", password: "" });
  };
  const handleSuccess = async (res) => {
    const { name, imageUrl, email, googleId } = res.profileObj;
    const token = res.tokenId;
    dispatch(loginGoogle({ name, imageUrl, googleId, email, token }, setCookies));
    history.push("/");
  };
  const handleFailure = () => {
    alert("Some errors were occur when login");
  };
  return (
    <div className="form">
      <h4 className="form__title">Login</h4>
      {notify.content && <Notify content={notify.content} type={notify.type} />}
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="submit-btn">
          Submit
        </button>
        <GoogleLogin
          clientId="467571315756-vigfi3qh89vvgbeqhduotlr2jso13gl5.apps.googleusercontent.com"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
          render={(props) => (
            <button className="gg-login-btn" onClick={props.onClick} disabled={props.disabled}>
              <FcGoogle /> Login with Google
            </button>
          )}
        />
      </form>
    </div>
  );
};

export default LoginForm;
