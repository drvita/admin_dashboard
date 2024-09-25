'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

interface DraftInvoice {
  id: string;
  clientName: string;
  amount: number;
  lastModified: Date;
}

interface DraftInvoicesProps {
  translations: {
    title: string;
    noDrafts: string;
    continueInvoice: string;
  };
}

const DraftInvoices: React.FC<DraftInvoicesProps> = ({ translations }) => {
  const theme = useTheme();
  
  // Mock data - in a real application, this would come from an API or state management
  const draftInvoices: DraftInvoice[] = [
    { id: '1', clientName: 'Acme Corp', amount: 1500, lastModified: new Date(2024, 8, 21) },
    { id: '2', clientName: 'Globex Inc', amount: 2000, lastModified: new Date(2024, 8, 22) },
    { id: '3', clientName: 'Soylent Corp', amount: 1000, lastModified: new Date(2024, 8, 23) },
  ].sort((a, b) => a.lastModified.getTime() - b.lastModified.getTime()); // Sort from oldest to newest

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  const handleContinueInvoice = (id: string) => {
    // In a real application, this would navigate to the invoice editing page
    console.log(`Continuing invoice ${id}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {translations.title}
      </Typography>
      {draftInvoices.length > 0 ? (
        <List>
          {draftInvoices.map((invoice) => (
            <ListItem
              key={invoice.id}
              alignItems="flex-start"
              secondaryAction={
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleContinueInvoice(invoice.id)}
                >
                  {translations.continueInvoice}
                </Button>
              }
            >
              <ListItemText
                primary={`${invoice.clientName} - $${invoice.amount.toFixed(2)}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Last modified: 
                    </Typography>
                    {" " + getTimeAgo(invoice.lastModified)}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {translations.noDrafts}
        </Typography>
      )}
    </Paper>
  );
};

export default DraftInvoices;