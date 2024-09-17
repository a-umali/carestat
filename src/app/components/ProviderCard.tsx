import React from 'react';
import { Card, CardContent, Typography, IconButton, Avatar, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProviderCardProps {
  name: string;
  title: string;
  specialty: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ name, title, specialty, imageUrl, onEdit, onDelete }) => {
  return (
    <Card sx={{ display: 'flex', marginBottom: '15px', alignItems: 'center', padding: '10px', boxShadow: 3 }}>
      <Avatar
        alt={name}
        src={imageUrl}
        sx={{ width: 80, height: 80, marginRight: '15px', border: '2px solid #ccc' }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography component="div" variant="h6" gutterBottom>
          {name} <span style={{ fontWeight: 'normal', fontSize: '0.875rem' }}>{title}</span>
        </Typography>
        <Typography color="text.secondary">
          {specialty}
        </Typography>
      </CardContent>
      <div>
        <IconButton aria-label="edit" onClick={onEdit} sx={{ marginRight: 1 }}>
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
