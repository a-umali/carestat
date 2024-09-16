import React, { useState } from 'react';
import { Modal, Button, TextField, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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

  const handleSubmit = () => {
    if (editingCardId !== null) {
      // Edit existing card
      setCards(cards.map(card => 
        card.id === editingCardId
          ? { ...card, title, date, description }
          : card
      ));
      setEditingCardId(null);
    } else {
      // Add new card
      const newCard = {
        id: Date.now(), // Use a timestamp as a unique ID
        title,
        date,
        description
      };

      setCards([...cards, newCard]);
    }

    setTitle('');
    setDate('');
    setDescription('');
    setShowModal(false);
  };

  const handleEdit = (card) => {
    setTitle(card.title);
    setDate(card.date);
    setDescription(card.description);
    setEditingCardId(card.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
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

      <TransitionGroup id="cardContainer" sx={{ marginTop: 2 }}>
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
                  {card.description}
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
