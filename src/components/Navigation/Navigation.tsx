import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { useAppStyles } from './Navigation.style';

const Navigation: FC = ({ children }) => {
  const classes = useAppStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.appBarHeader}>
          <Link to="/">SCRATCH</Link>
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
