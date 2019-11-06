import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// You can destructure `props` in place at the parameter definition.
// This helps keep code inside the function scope cleaner.
// You can also implicitly return the markup like so.
const Selector = ({
    handleSelector,
    data: {
        size,
        label,
        selectedValue,
        populateType,
        populateWith,
    },
}) => (
    <Grid item xs={size}>
        <FormControl variant='outlined' style={{width: '100%'}}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedValue || ""}
                onChange={handleSelector}
                inputProps={{ name: populateType }}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                {
                    populateType === 'author' ? (
                        populateWith.map((ele, index) => <MenuItem value={populateWith[index]} key={index}>{ele}</MenuItem>)
                    ) : (
                        populateWith.map(ele => <MenuItem value={ele.abbr} key={ele.abbr}>{ele.plural}</MenuItem>)
                    )
                }
            </Select>
        </FormControl>
    </Grid>
)

export default Selector;