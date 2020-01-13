import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import Post from "./components/Post/Post";

export default (
  <Switch>
    <Route exact path="/">
      <Auth />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/post/:postid">
      <Post />
    </Route>
    <Route path="/new">
      <Form />
    </Route>
  </Switch>
);
