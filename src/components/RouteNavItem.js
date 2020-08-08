import React from "react";
import { Route } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default props =>
  <Route
    path={props.href}
    exact
    children={({ match, history }) =>
      <Nav.Item
        onClick={e => history.push(e.currentTarget.getAttribute("href"))}
        {...props}
        active={match ? true : false}
      >
        {props.children}
      </Nav.Item>}
  />;
