'use client';

import React from 'react';
import { ListItem, TextField } from '@mui/material';

interface SidebarSearchProps {
  placeholder: string;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ placeholder }) => {
  return (
    <ListItem>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        size="small"
      />
    </ListItem>
  );
};

export default SidebarSearch;