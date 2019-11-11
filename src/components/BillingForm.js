import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { TextField, Divider } from '@material-ui/core';

import LoaderButton from './LoaderButton';

import { useFormFields } from '../libs/hooksLib';

function StripeInput(props) {
  const { component: Component, inputRef, ...other } = props;
  const elementRef = React.useRef();

  React.useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus
  }));

  return (
    <Component onReady={element => (elementRef.current = element)} {...other} />
  );
}

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    storage: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardError, setCardError] = useState('');

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return fields.name !== '' && fields.storage !== '' && isCardComplete;
  }

  function handleCardChange({ error, complete }) {
    if (error) {
      setCardError(error.message);
      setIsCardComplete(false);
    } else {
      setCardError('');
      setIsCardComplete(complete);
    }
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({
      name: fields.name
    });

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  }

  return (
    <form onSubmit={handleSubmitClick}>
      <TextField
        label="Storage"
        placeholder="Number of storage"
        variant="outlined"
        name="storage"
        id="storage"
        type="number"
        margin="normal"
        value={fields.storage}
        onChange={handleFieldChange}
        required
        fullWidth
      />
      <Divider />
      <TextField
        label="Cardholder's name"
        placeholder="Name of recipient on the given card"
        variant="outlined"
        name="name"
        id="name"
        margin="normal"
        value={fields.name}
        onChange={handleFieldChange}
        required
        fullWidth
      />
      <TextField
        margin="normal"
        label="Credit/Debit card information"
        variant="outlined"
        error={Boolean(cardError)}
        helperText={cardError ? cardError || 'Invalid' : ''}
        onChange={handleCardChange}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputProps: { component: CardElement },
          inputComponent: StripeInput
        }}
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
        Purchase
      </LoaderButton>
    </form>
  );
}

export default injectStripe(BillingForm);
