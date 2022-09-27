import React from "react";
import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

export const FormInputText = ({ name, control, label, type, minLength }: {name: string, control: any, label: string, type: string, minLength: number}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      rules={{
          required: `The ${name} does not have to be empty`,
          minLength: {
              value: minLength,
              message: `The ${name} cannot be less than ${minLength} characters`
          }
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          autoFocus
          type={type}
          sx={{m:3, width:'95%'}}
        />
      )}
    />
  );
};