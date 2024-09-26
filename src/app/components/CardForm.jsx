import React, { useState, useEffect } from 'react'; // Import necessary hooks and components
import { Modal, Button, TextField, FormControl, Card, CardContent, Typography } from '@mui/material'; // Import Material UI components
import AddIcon from '@mui/icons-material/Add'; // Import Add icon from Material UI
import { useTheme } from '@mui/material/styles'; // Import theme hook for styling
import { green } from '@mui/material/colors'; // Import color utilities

const CardForm = () => {
  // State variables for managing card data and modal visibility
  const [title, setTitle] = useState(''); // Title of the card
  const [date, setDate] = useState(''); // Date of the card
  const [description, setDescription] = useState(''); // Description of the card
  const [cards, setCards] = useState([]); // Array of cards
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [editingCardId, setEditingCardId] = useState(null); // ID of the card being edited

  const theme = useTheme(); // Get the current theme

  useEffect(() => {
    // Fetch cards from the server when the component mounts
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/cards'); // Fetch cards from the API
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Handle error response
        }
        const data = await response.json(); // Parse JSON data
        setCards(data); // Update cards state
      } catch (error) {
        console.error('Error fetching cards:', error); // Log errors to the console
      }
    };
    fetchCards(); // Call the fetch function
  }, []); // Empty dependency array ensures it runs once on mount

  const handleSubmit = async () => {
    // Handle form submission for creating or updating cards
    try {
      const method = editingCardId ? 'PUT' : 'POST'; // Determine method based on editing state
      const endpoint = '/api/cards'; // API endpoint for both POST and PUT

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' }, // Set headers
        body: JSON.stringify({ id: editingCardId, title, date, description }), // Prepare request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Handle error response
      }

      const result = await response.json(); // Parse the response
      if (editingCardId) {
        // Update existing card in state
        setCards(cards.map(card =>
          card.id === editingCardId ? { ...card, title, date, description } : card
        ));
      } else {
        // Add new card to state
        setCards([...cards, result]);
      }
      // Reset form fields and close modal
      setEditingCardId(null);
      setTitle('');
      setDate('');
      setDescription('');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting card:', error); // Log errors to the console
    }
  };

  const handleEdit = (card) => {
    // Populate form fields for editing a card
    setTitle(card.title);
    setDate(card.date);
    setDescription(card.description);
    setEditingCardId(card.id); // Set ID for editing
    setShowModal(true); // Open modal
  };

  const handleDelete = async (id) => {
    // Handle card deletion
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: 'DELETE', // Send DELETE request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Handle error response
      }

      // Filter out deleted card from state
      setCards(cards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error); // Log errors to the console
    }
  };

  // Helper function to format date strings
  const formatDate = (dateStr) => {
    const date = new Date(dateStr); // Convert date string to Date object
    return date.toLocaleDateString(); // Return formatted date
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { 
          // Reset form fields and open modal for adding new card
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
            key={card.id} // Unique key for each card
            sx={{
              marginTop: 2,
              marginBottom: 2,
              border: `5px solid green`, // Card border color
              maxWidth: 1000,
              overflow: 'auto', // Allow scrolling if content overflows
              color: 'black',
            }}
          >
            <CardContent sx={{ padding: '8px' }}>
              <Typography component="div" color={green}>
                {card.title} {/* Display card title */}
              </Typography>
              <Typography variant="subtitle2">
                {formatDate(card.date)} {/* Display formatted date */}
              </Typography>
              <Typography>
                {card.description} {/* Display card description */}
              </Typography>
              <div style={{ marginTop: 10 }}>
                <Button variant="outlined" color="white" onClick={() => handleEdit(card)}>
                  Edit {/* Edit button */}
                </Button>
                <Button variant="outlined" color="white" onClick={() => handleDelete(card.id)} style={{ marginLeft: 10 }}>
                  Delete {/* Delete button */}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{ padding: 20, backgroundColor: 'white', margin: 'auto', maxWidth: 600, color: 'black' }}>
          <h2>{editingCardId ? 'Edit a log' : 'Add a log'}</h2> {/* Modal title based on editing state */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state on change
              placeholder="Enter title"
              required // Make this field required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              value={date}
              onChange={(e) => setDate(e.target.value)} // Update date state on change
              InputLabelProps={{ shrink: true }} // Always show the label
              required // Make this field required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state on change
              placeholder="Enter description"
              multiline
              rows={3} // Set number of rows for multiline input
              required // Make this field required
            />
          </FormControl>
          <div style={{ marginTop: 20 }}>
            <Button variant="outlined" color="white" onClick={() => setShowModal(false)}>
              Close {/* Close button */}
            </Button>
            <Button variant="outlined" color="white" onClick={handleSubmit}>
              {editingCardId ? 'Save Changes' : 'Submit'} {/* Submit button text changes based on editing state */}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardForm; // Export the CardForm component
