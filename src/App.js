import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { CssBaseline, Button, Container } from '@material-ui/core';
import { Auth } from 'aws-amplify';

import Routes from './Routes';

import { Navigation } from './components/Navigation/Navigation';

/**
 * !IMPORTANT - I'm just enforcing material ui to work. I'm not changing any logic behind this boilerplate @vincent.
 */
function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    props.history.push('/login');
  }

  return (
    !isAuthenticating && (
      <>
        <CssBaseline />
        <Navigation>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={NavLink} to="/settings">
                Settings
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/login">
                Log in
              </Button>
              <Button color="inherit" component={NavLink} to="/signup">
                Sign up
              </Button>
            </>
          )}
        </Navigation>
        <Container>
          <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
        </Container>
      </>
    )
  );
}

export default withRouter(App);
