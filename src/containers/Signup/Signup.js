import React, { useState } from 'react';
import { TextField, Container } from '@material-ui/core';
import { Auth } from 'aws-amplify';

import LoaderButton from '../../components/LoaderButton';

import { useFormFields } from '../../libs/hooksLib';

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      props.userHasAuthenticated(true);
      props.history.push('/');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <TextField
          id="confirmationCode"
          label="Confirmation code"
          margin="normal"
          name="confirmationCode"
          type="tel"
          variant="outlined"
          onChange={handleFieldChange}
          value={fields.confirmationCode}
          helperText="Please check your email for the code."
          autoFocus
          fullWidth
        />
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
          fullWidth
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          margin="normal"
          name="email"
          type="email"
          variant="outlined"
          value={fields.email}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          margin="normal"
          name="password"
          type="password"
          variant="outlined"
          value={fields.password}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          id="confirmPassword"
          label="Confirm password"
          margin="normal"
          name="confirmPassword"
          type="password"
          variant="outlined"
          onChange={handleFieldChange}
          value={fields.confirmPassword}
          fullWidth
        />
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
          fullWidth
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <Container maxWidth="sm">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </Container>
  );
}
