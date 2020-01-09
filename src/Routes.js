import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Notes from "./containers/Notes";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home {...appProps} />
      </Route>
      <UnauthenticatedRoute path="/login" exact appProps={appProps} >
        <Login {...appProps} />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute path="/signup" exact appProps={appProps} >
        <Signup {...appProps} />
      </UnauthenticatedRoute>
      <AuthenticatedRoute path="/settings" exact appProps={appProps} >
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/notes/new" exact appProps={appProps}>
        <NewNote />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/notes/:id" exact appProps={appProps}>
        <Notes />
      </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
