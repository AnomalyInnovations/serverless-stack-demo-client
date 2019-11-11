import React from 'react';
import { Typography, Grid } from '@material-ui/core';

const NotFound = () => {
  return (
    <Grid container justify="center">
      <Grid item>
        <br />
        <Typography variant="h4">Sorry, page not found!</Typography>
      </Grid>
    </Grid>
  );
}

export default NotFound;