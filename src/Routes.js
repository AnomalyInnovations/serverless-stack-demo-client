import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={asyncComponent('Home')} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={asyncComponent('Login')} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={asyncComponent('Signup')} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={asyncComponent('NewNote')} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={asyncComponent('Notes')} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={asyncComponent('NotFound')} />
  </Switch>
);
