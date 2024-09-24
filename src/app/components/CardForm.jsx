import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, FormControl, Card, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const CardForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    // Fetch cards on component mount
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/cards');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  const handleSubmit = async () => {
    try {
      const method = editingCardId ? 'PUT' : 'POST';
      const endpoint = '/api/cards'; // Endpoint is the same for both POST and PUT

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingCardId, title, date, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (editingCardId) {
        // Handle successful update
        setCards(cards.map(card =>
          card.id === editingCardId ? { ...card, title, date, description } : card
        ));
      } else {
        // Handle new card addition
        setCards([...cards, result]);
      }
      setEditingCardId(null);
      setTitle('');
      setDate('');
      setDescription('');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting card:', error);
    }
  };

  const handleEdit = (card) => {
    setTitle(card.title);
    setDate(card.date);
    setDescription(card.description);
    setEditingCardId(card.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  // Helper function to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Formats date to "MM/DD/YYYY" by default; you can adjust the format if needed
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { 
          setTitle(''); 
          setDate(''); 
          setDescription(''); 
          setEditingCardId(null); 
          setShowModal(true); 
        }}
      >
        <AddIcon /> Add a log
      </Button>

      <div id="cardContainer">
        {cards.map(card => (
          <Card
            key={card.id}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              border: `5px solid green`,
              maxWidth: 1000,
              overflow: 'auto',
              color: 'black',
            }}
          >
            <CardContent sx={{ padding: '8px' }}>
              <Typography component="div" color={green}>
                {card.title}
              </Typography>
              <Typography variant="subtitle2">
                {formatDate(card.date)} {/* Format date to remove time */}
              </Typography>
              <Typography>
                {card.description}
              </Typography>
              <div style={{ marginTop: 10 }}>
                <Button variant="outlined" color="secondary" onClick={() => handleEdit(card)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(card.id)} style={{ marginLeft: 10 }}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{ padding: 20, backgroundColor: 'white', margin: 'auto', maxWidth: 600, color: 'black' }}>
          <h2>{editingCardId ? 'Edit a log' : 'Add a log'}</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              multiline
              rows={3}
              required
            />
          </FormControl>
          <div style={{ marginTop: 20 }}>
            <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {editingCardId ? 'Save Changes' : 'Submit'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardForm;
