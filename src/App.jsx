import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

import Header from "./components/Header/Header";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Error from "./components/pages/Error";
import PostPage from "./components/pages/PostPage";

import { fetchPost } from "./actions/post.action";
import { checkLogin } from "./actions/user.action";
import { setSocket } from "./actions/chat.action";

const ENDPOINT = "https://blog-cutehotme.herokuapp.com/";
const App = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["user"]);
  useEffect(() => {
    const socket = io(ENDPOINT, { transports: ["websocket", "polling", "flashsocket"] });
    dispatch(setSocket(socket));
    if (cookies.user !== "") {
      dispatch(checkLogin(cookies.user));
    }
  }, []);
  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);
  return (
    <main className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
