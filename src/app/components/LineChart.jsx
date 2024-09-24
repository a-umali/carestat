import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Button, TextField, Typography, Paper } from '@mui/material';

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [numberInput, setNumberInput] = useState('');

  const handleAddData = () => {
    const date = dateInput;
    const time = timeInput;
    const number = parseFloat(numberInput);

    if (date && time && !isNaN(number)) {
      const label = `${date}T${time}`;
      const newEntry = { label, number };
      const updatedEntries = [...labels.map((label, index) => ({ label, number: data[index] })), newEntry];

      updatedEntries.sort((a, b) => new Date(a.label) - new Date(b.label));

      setLabels(updatedEntries.map(entry => entry.label));
      setData(updatedEntries.map(entry => entry.number));

      setDateInput('');
      setTimeInput('');
      setNumberInput('');
    } else {
      alert("Please enter a valid date, time, and number.");
    }
  };

  const getBorderColor = () => {
    if (data.some(value => value < 3.5 || value > 8.0)) {
      return 'rgba(255, 0, 0, 0.8)'; // Red color for out-of-range values
    }
    return 'rgba(0, 238, 131, 0.8)'; // Green color for within-range values
  };

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
      <Typography variant="h4" gutterBottom color='black'>
        Check your Blood Sugar Level
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
The line will turn RED if the measured value is outside the healthy range. Please seek guidance from a medical professional to discuss your results and receive appropriate advice.
      </Typography>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="Date (e.g., 2024-01-25)"
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time (e.g., 14:30:00)"
          type="time"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
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
      </div>
      <div style={{ width: '100%', height: '500px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Paper>
  );
};

export default LineChart;
