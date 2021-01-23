import React from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../actions/user.action";
import memories from "../../images/memories.png";
import "./Header.scss";

const Header = () => {
  const history = useHistory();
  const [_, setCookies] = useCookies(["user"]);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const login = () => {
    history.push("/login");
  };
  const register = () => history.push("/register");
  const logout = async () => {
    await setCookies("user", "", { path: "/" });
    dispatch(logoutUser());
  };
  return (
    <header className="header">
      <div className="header__left" onClick={() => history.push("/")}>
        <h1>Cutehotme</h1>
        <img src={memories} alt="logo-memories" />
      </div>
      <div className="header__right">
        {user.token ? (
          <>
            <div className="user-status">
              <img src={user.user.photoURL} alt="avatar" className="avatar" />
              <h5 className="display-name">{user.user.displayName}</h5>
            </div>
            <button className="login" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {" "}
            <button className="login" onClick={login}>
              Login
            </button>
            <button className="sign-up" onClick={register}>
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
