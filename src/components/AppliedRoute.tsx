import React, { FC } from 'react';
import { Route } from 'react-router-dom';

import { IRouteProps } from '../Routes';

const AppliedRoute: FC<IRouteProps> = ({ component: C, appProps, ...rest }) => {
  return (
    <Route {...rest} render={props => C && <C {...props} {...appProps} />} />
  );
};

export default AppliedRoute;
