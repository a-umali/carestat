import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setBmi(null);
    setCategory('');

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height); // Keep height in cm for local calculation

    if (isNaN(weightValue) || weightValue <= 0 || isNaN(heightValue) || heightValue <= 0) {
      setError('Please enter valid positive numbers for weight and height.');
      return;
    }

    try {
      const response = await fetch('/api/bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight: weightValue, height: heightValue }), // Send height in cm
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      setBmi(data.bmi);
      setCategory(data.category);
    } catch (err) {
      setError(err.message || 'An error occurred while calculating BMI.');
    }
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6">BMI Calculator</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Weight (kg)"
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          required
          margin="normal"
          inputProps={{ min: "0", step: "0.1" }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Height (cm)" // Change label to centimeters
          type="number"
          step="0.1" // Adjust step to match centimeters
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
          required
          margin="normal"
          inputProps={{ min: "0", step: "0.1" }}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Calculate BMI
        </Button>
      </form>
      {bmi !== null && !isNaN(bmi) && (
        <div style={{ marginTop: '16px' }}>
          <Typography variant="h6">Your BMI is: {bmi.toFixed(1)}</Typography>
          <Typography>Category: {category}</Typography>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '16px' }}>
          <Typography color="error">Error: {error}</Typography>
        </div>
      )}
    </Paper>
  );
};

export default BmiCalculator;
