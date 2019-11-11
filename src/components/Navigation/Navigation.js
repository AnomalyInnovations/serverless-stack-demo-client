import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { useAppStyles } from './Navigation.style';

export function Navigation({ children }) {
  const classes = useAppStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className={classes.appBarHeader}
        >
          SCRATCH
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
}
