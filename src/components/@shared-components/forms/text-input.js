import React from 'react';
import { TextField } from '@mui/material';

const DMTTextInput = ({
                          label,
                          fullWidth,
                          autoFocus,
                          value,
                          name,
                          type,
                          placeholder,
                          error,
                          helperText,
                          onChange
                      }) => (
    <TextField
        label={label}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        onChange={onChange}
        variant="outlined"
    />
);

export default DMTTextInput;
