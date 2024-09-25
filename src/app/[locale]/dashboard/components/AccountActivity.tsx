'use client';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaymentIcon from '@mui/icons-material/Payment';

interface ActivityItem {
  id: number;
  type: 'invoice' | 'client' | 'payment';
  description: string;
  date: string;
  read: boolean;
}

interface AccountActivityProps {
  translations: {
    title: string;
    markAsRead: string;
    noActivity: string;
  };
}

const AccountActivity: React.FC<AccountActivityProps> = ({ translations }) => {
  const theme = useTheme();
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, type: 'invoice', description: 'New invoice created', date: '2023-09-23', read: false },
    { id: 2, type: 'client', description: 'New client added', date: '2023-09-22', read: false },
    { id: 3, type: 'payment', description: 'Payment received', date: '2023-09-21', read: true },
    { id: 4, type: 'invoice', description: 'Invoice sent', date: '2023-09-20', read: true },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <DescriptionIcon />;
      case 'client':
        return <PersonAddIcon />;
      case 'payment':
        return <PaymentIcon />;
      default:
        return <DescriptionIcon />;
    }
  };

  const handleMarkAsRead = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, read: true } : activity
    ));
  };

  const getOpacity = (index: number) => {
    return 1 - (index * 0.2);
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
      {activities.length > 0 ? (
        <List>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.id}
              secondaryAction={
                !activity.read && (
                  <IconButton 
                    edge="end" 
                    aria-label={translations.markAsRead}
                    onClick={() => handleMarkAsRead(activity.id)}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                )
              }
            >
              <ListItemIcon sx={{ opacity: getOpacity(index) }}>
                {getIcon(activity.type)}
              </ListItemIcon>
              <ListItemText 
                primary={activity.description}
                secondary={activity.date}
                sx={{ 
                  opacity: activity.read ? 0.7 : 1,
                  '& .MuiListItemText-primary': {
                    fontWeight: activity.read ? 'normal' : 'bold',
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {translations.noActivity}
        </Typography>
      )}
    </Paper>
  );
};

export default AccountActivity;