import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { IRouteProps } from '../Routes';

const querystring = (name: string, url = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const UnauthenticatedRoute: FC<IRouteProps> = ({
  component: C,
  appProps,
  ...rest
}) => {
  const redirect = querystring('redirect');
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated && C ? (
          <C {...appProps} {...props} />
        ) : (
          <Redirect
            to={redirect === '' || redirect === null ? '/' : redirect}
          />
        )
      }
    />
  );
};

export default UnauthenticatedRoute;
