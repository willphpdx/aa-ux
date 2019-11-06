import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

export default function AuthorInput({
      handleSelection,
      authors
    })
{
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        id="standard-select-author"
        select
        label="Author"
        className={classes.textField}
        onChange={handleSelection}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Select one of the AudAud authors"
        margin="normal"
      >
        {authors.map(a => (
          <MenuItem key={a} value={a}>
            {a}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
