import React, { useState, useImperativeHandle, FormEvent, FC } from 'react';
import {
  CardElement,
  injectStripe,
  ReactStripeElements
} from 'react-stripe-elements';
import { TextField, Divider } from '@material-ui/core';
import { useTheme, fade } from '@material-ui/core/styles';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

import LoaderButton from './LoaderButton';

import { useFormFields } from '../libs/hooksLib';

const StripeInput: FC<InputBaseComponentProps> = props => {
  const {
    component: Component,
    inputRef,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribeBy,
    defaultValue,
    required,
    onKeyDown,
    onKeyUp,
    readOnly,
    autoComplete,
    autoFocus,
    type,
    name,
    rows,
    handleCardChange,
    ...other
  } = props;
  const theme = useTheme();
  const [mountNode, setMountNode] = useState();

  useImperativeHandle(
    inputRef,
    () => ({
      focus: () => mountNode.focus()
    }),
    [mountNode]
  );

  const handleChange = (event: ReactStripeElements.ElementChangeResponse) =>
    handleCardChange(event);

  return (
    <Component
      {...other}
      onReady={setMountNode}
      style={{
        base: {
          color: theme.palette.text.primary,
          fontSize: `${theme.typography.fontSize}px`,
          fontFamily: theme.typography.fontFamily,
          '::placeholder': {
            color: fade(theme.palette.text.primary, 0.42)
          }
        },
        invalid: {
          color: theme.palette.text.primary
        }
      }}
      onChange={handleChange}
    />
  );
};

interface IBillingProps {
  isLoading?: boolean;
  onSubmit: (
    storage: string,
    token: ReactStripeElements.PatchedTokenResponse
  ) => Promise<void>;
}

const BillingForm: FC<
  IBillingProps & ReactStripeElements.InjectedStripeProps
> = ({ isLoading, onSubmit, ...props }) => {
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    storage: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardError, setCardError] = useState('');

  isLoading = isProcessing || isLoading;

  const validateForm = () => {
    return fields.name !== '' && fields.storage !== '' && isCardComplete;
  };

  const handleCardChange = ({
    complete,
    error
  }: ReactStripeElements.ElementChangeResponse) => {
    if (error && error.message) {
      setCardError(error.message);
      setIsCardComplete(false);
    } else {
      setCardError('');
      setIsCardComplete(complete);
    }
  };

  const handleSubmitClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!props.stripe) return;

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({
      name: fields.name
    });

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  };

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
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputProps: { component: CardElement, handleCardChange },
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
};

export default injectStripe(BillingForm);
