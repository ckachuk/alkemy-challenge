
import { Controller } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export const FormInputSelect = ({
    name,
    control,
    label,
    disabled,
    options
  }: {name:string, control:any, label:string, disabled:boolean, options: {label:string, value:string}[]}) => {
    const generateSingleOptions = () => {
      return options.map((option: any) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        );
      });
    };
  
    return (
        <Controller
         rules={{
          required: `The ${name} does not have to be empty`,
        }}
          render={({ 
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <TextField 
              onChange={onChange}
              value={value}
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              select
              fullWidth
              label={label}
              variant="outlined"
              autoFocus
              sx={{m:3, width:'95%'}}
              disabled={disabled}
            >
              {generateSingleOptions()}
            </TextField>
          )}
          control={control}
          name={name}
          defaultValue=''
        />
    );
  };