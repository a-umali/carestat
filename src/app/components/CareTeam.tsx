import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, FormControl, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProviderCard from './ProviderCard';

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

  // Fetch providers from the API on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('/api/careteam');
        const data = await response.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setProviders(data);
        } else {
          console.error('Expected an array from API');
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
    fetchProviders();
  }, []);

  // Handle adding or updating provider
  const handleAddProvider = async () => {
    try {
      if (isEditing) {
        await fetch(`/api/careteam`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProvider),
        });
        setProviders(providers.map(provider =>
          provider.id === newProvider.id ? newProvider : provider
        ));
        setIsEditing(false);
      } else {
        await fetch(`/api/careteam`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProvider),
        });
        setProviders([...providers, { ...newProvider, id: Date.now() }]);
      }
      resetProviderForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding/updating provider:', error);
    }
  };

  // Handle provider deletion
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/careteam/${id}`, {
        method: 'DELETE',
      });
      setProviders(providers.filter(provider => provider.id !== id));
    } catch (error) {
      console.error('Error deleting provider:', error);
    }
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
      {providers.length > 0 ? (
        providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            {...provider}
            onEdit={() => handleEdit(provider)}
            onDelete={() => handleDelete(provider.id)}
          />
        ))
      ) : (
        <p>No providers found.</p>
      )}
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
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
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
          <Paper sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddProvider}>
              {isEditing ? 'Save Changes' : 'Add Provider'}
            </Button>
          </Paper>
        </Paper>
      </Modal>
    </div>
  );
};

export default CareTeam;
