import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Elements,
  StripeProvider,
  ReactStripeElements
} from 'react-stripe-elements';
import { Container } from '@material-ui/core';
import { API } from 'aws-amplify';

import BillingForm from '../../components/BillingForm';

import config from '../../config';

const Settings: FC<RouteComponentProps> = props => {
  const [isLoading, setIsLoading] = useState(false);

  const billUser = (details: { storage: string; source: string }) =>
    API.post('notes', '/billing', {
      body: details
    });

  const handleFormSubmit = async (
    storage: string,
    { token, error }: ReactStripeElements.PatchedTokenResponse
  ) => {
    if (!token) return;

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
  };

  return (
    <Container maxWidth="sm">
      <StripeProvider apiKey={config.STRIPE_KEY}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </Container>
  );
};

export default Settings;
