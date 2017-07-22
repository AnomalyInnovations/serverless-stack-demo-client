import React, { Component } from 'react';
import {
  withRouter,
  Link
} from 'react-router-dom';
import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap';
import { authUser, signOutUser } from './libs/awsLib';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isLoadingUserToken: true,
    };
  }

  async componentDidMount() {
    if (await authUser()) {
      this.userHasAuthenticated(true);
    }

    this.setState({ isLoadingUserToken: false });
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({
      isAuthenticated: authenticated
    });
  }

  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  handleLogout = (event) => {
    signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push('/login');
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return ! this.state.isLoadingUserToken
    &&
    (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : [ <RouteNavItem key={1} onClick={this.handleNavLink} href="/signup">Signup</RouteNavItem>,
                    <RouteNavItem key={2} onClick={this.handleNavLink} href="/login">Login</RouteNavItem> ] }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }

}

export default withRouter(App);
