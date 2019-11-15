import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { useStyles } from './Navigation.style';

const Navigation: FC = ({ children }) => {
  const classes = useStyles({});

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.appBarHeader}>
          <Link to='/'>{`Scratch - v${process.env.REACT_APP_VERSION}`}</Link>
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
