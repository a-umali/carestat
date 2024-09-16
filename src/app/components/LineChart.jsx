import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelInput, setLabelInput] = useState('');
  const [numberInput, setNumberInput] = useState('');

  const handleAddData = () => {
    const label = labelInput;
    const number = parseFloat(numberInput);

    if (label !== "" && !isNaN(number)) {
      // Create a new data point with the input values
      const newEntry = { label, number };

      // Add the new entry to the data array
      const updatedEntries = [...labels.map((label, index) => ({ label, number: data[index] })), newEntry];

      // Sort entries by label (date/time)
      updatedEntries.sort((a, b) => new Date(a.label) - new Date(b.label));

      // Update labels and data arrays
      setLabels(updatedEntries.map(entry => entry.label));
      setData(updatedEntries.map(entry => entry.number));

      // Clear input fields
      setLabelInput('');
      setNumberInput('');
    } else {
      alert("Please enter both label and a valid number.");
    }
  };

  // Determine line color based on data values
  const getBorderColor = () => {
    if (data.some(value => value < 3.5 || value > 8.0)) {
      return 'rgba(255, 0, 0, 0.8)'; // Red color for out-of-range values
    }
    return 'rgba(0, 238, 131, 0.8)'; // Green color for within-range values
  };

  // Chart data and options
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Blood Sugar Level - mmol/L',
        data,
        borderColor: getBorderColor(),
        borderWidth: 1,
        fill: false
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Blood Sugar Level (mmol/L)'
        }
      }
    }
  };

  return (
    <Paper sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h4" gutterBottom>
        Check your Blood Sugar Level
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Line will turn RED if it's not within health range
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Date/Time (e.g., 2024-08-21T14:30:00)"
          value={labelInput}
          onChange={(e) => setLabelInput(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Blood Sugar Level (mmol/L)"
          type="number"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Button
          onClick={handleAddData}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Data
        </Button>
      </Box>
      <Box sx={{ width: '100%', height: '500px' }}>
        <Line data={chartData} options={chartOptions} />
      </Box>
    </Paper>
  );
};

export default LineChart;
