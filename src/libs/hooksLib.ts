import { useState, ChangeEvent } from 'react';

export const useFormFields = <S>(
  initialState: S
): [S, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
};
