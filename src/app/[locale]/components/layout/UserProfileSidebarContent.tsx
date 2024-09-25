import React from 'react';
import { User } from '@/lib/interfaces';
import { Avatar, Typography, Box } from '@mui/material';

interface UserProfileSidebarContentProps {
  userProfile: User;
  membershipText: string;
}

const UserProfileSidebarContent: React.FC<UserProfileSidebarContentProps> = ({ userProfile, membershipText }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const capitalizeName = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const capitalizedName = capitalizeName(userProfile.name);

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {userProfile.avatar ? (
        <Avatar 
          src={userProfile.avatar} 
          alt={capitalizedName}
          sx={{ width: 64, height: 64, marginBottom: 1 }}
        />
      ) : (
        <Avatar 
          sx={{ width: 64, height: 64, marginBottom: 1, bgcolor: 'primary.main' }}
        >
          {getInitials(userProfile.name)}
        </Avatar>
      )}
      <Typography variant="h6" component="h2" align="center">
        {capitalizedName}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {userProfile.email}
      </Typography>
      <Typography variant="caption" color="primary" align="center">
        {membershipText}
      </Typography>
      {userProfile.company && userProfile.company.name && (
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          {userProfile.company.name}
        </Typography>
      )}
      {userProfile.main_phone && userProfile.main_phone.number && (
        <Typography variant="body2" align="center">
          {userProfile.main_phone.number}
        </Typography>
      )}
    </Box>
  );
};

export default UserProfileSidebarContent;