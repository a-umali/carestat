import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, FormControl, Card, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CardForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);

  const theme = useTheme();
  const secondaryColor = theme.palette.secondary.main;

  useEffect(() => {
    // Fetch cards on component mount
    const fetchCards = async () => {
      const response = await fetch('/api/cards');
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      } else {
        console.error('Error fetching cards:', await response.json());
      }
    };
    fetchCards();
  }, []);

  const handleSubmit = async () => {
    const method = editingCardId ? 'PUT' : 'POST';
    const endpoint = '/api/cards'; // Endpoint is the same for both POST and PUT

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingCardId, title, date, description }),
    });

    if (response.ok) {
      if (editingCardId) {
        // Handle successful update
        const updatedCard = await response.json();
        setCards(cards.map(card =>
          card.id === editingCardId ? { ...card, title, date, description } : card
        ));
      } else {
        // Handle new card addition
        const newCard = await response.json();
        setCards([...cards, newCard]);
      }
      setEditingCardId(null);
      setTitle('');
      setDate('');
      setDescription('');
      setShowModal(false);
    } else {
      const error = await response.json();
      console.error('Error:', error);
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
    const response = await fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      setCards(cards.filter(card => card.id !== id));
    } else {
      const error = await response.json();
      console.error('Error:', error);
    }
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

      <TransitionGroup id="cardContainer">
        {cards.map(card => (
          <CSSTransition
            key={card.id}
            timeout={500}
            classNames="card"
          >
            <Card
              sx={{
                marginTop: 2,
                marginBottom: 2,
                border: `5px solid ${secondaryColor}`,
                maxWidth: 1000,
                overflow: 'auto',
                color: 'black',
              }}
            >
              <CardContent sx={{ padding: '8px' }}>
                <Typography component="div" color={secondaryColor}>
                  {card.title}
                </Typography>
                <Typography variant="subtitle2">
                  {card.date}
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
          </CSSTransition>
        ))}
      </TransitionGroup>

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
