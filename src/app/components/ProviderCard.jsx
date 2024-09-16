import React from 'react';
import { Card, CardContent, Typography, IconButton, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProviderCard = ({ name, title, specialty, imageUrl, onEdit, onDelete }) => {
  return (
    <Card style={{ display: 'flex', marginBottom: '15px', alignItems: 'center', padding: '10px' }}>
      <Avatar alt={name} src={imageUrl} style={{ marginRight: '15px' }} />
      <CardContent style={{ flex: 1 }}>
        <Typography component="div">
          {name} <span style={{ fontWeight: 'normal' }}>{title}</span>
        </Typography>
        <Typography color="text.secondary">
          {specialty}
        </Typography>
      </CardContent>
      <div>
        <IconButton aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default ProviderCard;
