import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const DMTPasswordInput = ({
                              label,
                              fullWidth,
                              value,
                              name,
                              placeholder,
                              error,
                              helperText,
                              onChange
                          }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            label={label}
            fullWidth={fullWidth}
            value={value}
            name={name}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            onChange={onChange}
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default DMTPasswordInput;
