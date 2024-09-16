import React, { useState } from 'react';
import { Button, Modal, TextField, FormControl, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProviderCard from './ProviderCard';

// Define types for provider and form state
interface Provider {
  id: number | null;
  name: string;
  title: string;
  specialty: string;
  imageUrl: string;
}

const CareTeam: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newProvider, setNewProvider] = useState<Provider>({
    id: null,
    name: '',
    title: '',
    specialty: '',
    imageUrl: '',
  });

  // Handle adding or updating provider
  const handleAddProvider = () => {
    if (isEditing) {
      setProviders(providers.map(provider =>
        provider.id === newProvider.id ? newProvider : provider
      ));
      setIsEditing(false);
    } else {
      setProviders([...providers, { ...newProvider, id: Date.now() }]);
    }
    resetProviderForm();
    setShowModal(false);
  };

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProvider(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Set provider to edit mode
  const handleEdit = (provider: Provider) => {
    setNewProvider(provider);
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle provider deletion
  const handleDelete = (id: number) => {
    setProviders(providers.filter(provider => provider.id !== id));
  };

  // Reset the provider form
  const resetProviderForm = () => {
    setNewProvider({
      id: null,
      name: '',
      title: '',
      specialty: '',
      imageUrl: '',
    });
  };

  return (
    <div>
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          {...provider}
          onEdit={() => handleEdit(provider)}
          onDelete={() => handleDelete(provider.id)}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          resetProviderForm();
          setIsEditing(false);
          setShowModal(true);
        }}
      >
        Add Provider
      </Button>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            color: 'black',
          }}
        >
          <h2>{isEditing ? 'Edit Provider' : 'Add New Provider'}</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={newProvider.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={newProvider.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Specialty"
              variant="outlined"
              name="specialty"
              value={newProvider.specialty}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Image URL"
              variant="outlined"
              name="imageUrl"
              value={newProvider.imageUrl}
              onChange={handleChange}
            />
          </FormControl>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddProvider}>
              {isEditing ? 'Save Changes' : 'Add Provider'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CareTeam;
