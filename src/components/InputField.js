import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

// You can destructure `props` in place at the parameter definition.
// This helps keep code inside the function scope cleaner.
// You can also implicitly return the markup like so.
const InputField = ({ 
    handleInput,
    data: { 
        currentValue, 
        input,
        label, 
        name, 
    }, 
}) => (
    <Grid item xs={6}>
        <TextField
            variant='outlined'
            label={label}
            value={currentValue}
            name={name}
            onChange={handleInput}
            InputProps={{
                endAdornment: <InputAdornment position='end'>{input}</InputAdornment>
            }}
            style={{width: '100%'}}
        />
    </Grid>
);


export default InputField;