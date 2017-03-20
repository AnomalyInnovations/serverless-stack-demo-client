import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import LoaderButton from '../components/LoaderButton';
import config from '../config.js';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
    };
  }

  validateForm() {
    return this.state.username.length > 0
      && this.state.password.length > 0
      && this.state.password === this.state.confirmPassword;
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await this.signup(this.state.username, this.state.password);
      this.setState({
        newUser: newUser
      });
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode);
      const userToken = await this.authenticate(
        this.state.newUser,
        this.state.username,
        this.state.password
      );

      this.props.updateUserToken(userToken);
      this.props.history.push('/');
    }
    catch(e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  signup(username, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const attributeEmail = new CognitoUserAttribute({ Name : 'email', Value : username });

    return new Promise((resolve, reject) => (
      userPool.signUp(username, password, [attributeEmail], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      })
    ));
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) => (
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    ));
  }

  authenticate(user, username, password) {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err),
      })
    ));
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange} />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={ ! this.validateConfirmationForm() }
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…" />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.username}
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password" />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password" />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={ ! this.validateForm() }
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…" />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        { this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm() }
      </div>
    );
  }
}

export default withRouter(Signup);
