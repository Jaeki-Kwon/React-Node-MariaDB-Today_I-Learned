import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import BoardWriteForm from "./views/BoardWriteForm/BoardWriteForm";
import BoardDetail from "./views/BoardDetail/BoardDetail";
import BoardUpdate from "./views/BoardUpdate/BoardUpdate";
import Auth from "../hoc/auth";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route
          exact
          path="/board/write"
          component={Auth(BoardWriteForm, true)}
        />
        <Route
          exact
          path="/board/:boardId"
          component={Auth(BoardDetail, null)}
        />
        <Route
          exact
          path="/board/:boardId/update"
          component={Auth(BoardUpdate, true)}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
