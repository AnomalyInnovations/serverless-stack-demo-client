import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ children, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={({location}) =>
        appProps.isAuthenticated
          ? children
          : <Redirect
              to={`/login?redirect=${location.pathname}${location.search}`}
            />}
    />
  );
}
