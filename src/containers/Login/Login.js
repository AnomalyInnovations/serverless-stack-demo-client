import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField, Container } from '@material-ui/core';

import LoaderButton from '../../components/LoaderButton';
import { useFormFields } from '../../libs/hooksLib';

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
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
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
          fullWidth
        >
          Login
        </LoaderButton>
      </form>
    </Container>
  );
}
