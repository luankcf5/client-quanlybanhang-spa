import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

type Props = {
  attributes: any;
};
export default function ProductAttributes({ attributes }: Props) {
  return (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} sx={{ pt: 1 }}>
      {attributes.map((attribute: any) => (
        <AttributeItem key={attributes.name} attribute={attribute} />
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

function AttributeItem({ attribute }: any) {
  return (
    <Stack direction="row">
      <FormControl fullWidth>
        <InputLabel size="small">{attribute.name}</InputLabel>
        <Select size="small" label={attribute.name}>
          {attribute.options.map((option: string) => (
            <MenuItem key={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
