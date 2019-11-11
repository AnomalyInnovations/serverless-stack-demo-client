import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Container } from '@material-ui/core';
import { API } from 'aws-amplify';

import BillingForm from '../../components/BillingForm';

import config from '../../config';

export default function Settings(props) {
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post('notes', '/billing', {
      body: details
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id
      });

      alert('Your card has been charged successfully!');
      props.history.push('/');
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <StripeProvider apiKey={config.STRIPE_KEY}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </Container>
  );
}
