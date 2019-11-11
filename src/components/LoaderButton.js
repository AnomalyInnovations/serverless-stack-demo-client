import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

export default function LoaderButton({
  isLoading,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading ? <CircularProgress /> : props.children}
    </Button>
  );
}
