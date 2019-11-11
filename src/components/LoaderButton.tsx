import React, { FC } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';

interface IProps extends ButtonProps {
  isLoading?: boolean;
}

const LoaderButton: FC<IProps> = ({ isLoading, disabled, ...props }) => {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading ? <CircularProgress /> : props.children}
    </Button>
  );
};

export default LoaderButton;
