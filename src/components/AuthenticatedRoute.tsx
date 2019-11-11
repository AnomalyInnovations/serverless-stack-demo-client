import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { IRouteProps } from '../Routes';

const AuthenticatedRoute: FC<IRouteProps> = ({
  component: C,
  appProps,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated && C ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
