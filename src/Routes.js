import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const importHome      = () => import('./containers/Home');
const importLogin     = () => import('./containers/Login');
const importNotes     = () => import('./containers/Notes');
const importSignup    = () => import('./containers/Signup');
const importNewNote   = () => import('./containers/NewNote');
const importNotFound  = () => import('./containers/NotFound');

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={asyncComponent(importHome)} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={asyncComponent(importLogin)} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={asyncComponent(importSignup)} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={asyncComponent(importNewNote)} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={asyncComponent(importNotes)} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={asyncComponent(importNotFound)} />
  </Switch>
);
