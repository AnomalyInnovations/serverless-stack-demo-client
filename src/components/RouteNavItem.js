import React from "react";
import { Route } from "react-router-dom";
import { NavItem } from "react-bootstrap";

const handleClick = (history, event) => {
    history.push(event.currentTarget.getAttribute("href"))
}

export default props =>
  <Route
    path={props.href}
    exact
    children={({ match, history }) =>
      <NavItem
        onClick={handleClick.bind(this, history)}
        {...props}
        active={match ? true : false}
      >
        {props.children}
      </NavItem>}
  />;
