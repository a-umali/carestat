import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton, Paper } from '@mui/material';
import Calendar from 'react-calendar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-calendar/dist/Calendar.css';

interface ReminderCalendarProps {
    provider: any; // Replace 'any' with the appropriate type if known
}

const ReminderCalendar: React.FC<ReminderCalendarProps> = ({ provider }) => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState<{ [key: string]: string[] }>({});
  const [newReminder, setNewReminder] = useState('');

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleAddReminder = () => {
    const dateKey = date.toDateString();
    if (newReminder.trim()) {
      setReminders((prevReminders) => ({
        ...prevReminders,
        [dateKey]: [...(prevReminders[dateKey] || []), newReminder],
      }));
      setNewReminder('');
    }
  };

  const handleDeleteReminder = (dateKey: string, index: number) => {
    setReminders((prevReminders) => ({
      ...prevReminders,
      [dateKey]: prevReminders[dateKey].filter((_, i) => i !== index),
    }));
  };

  const selectedDateKey = date.toDateString();
  const currentReminders = reminders[selectedDateKey] || [];

  const getUpcomingReminders = () => {
    const today = new Date();
    const upcoming = Object.keys(reminders)
      .filter(dateKey => new Date(dateKey) >= today)
      .sort((a, b) => new Date(a) - new Date(b))
      .map(dateKey => ({
        date: dateKey,
        reminders: reminders[dateKey]
      }));
    return upcoming;
  };

  const upcomingReminders = getUpcomingReminders();

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center" sx={{ bgcolor: 'background.default' }}>
      <Typography gutterBottom color="text.primary">
        Calendar with Reminders
      </Typography>
      <Box mt={4} p={2} width="100%" maxWidth={400} sx={{ bgcolor: 'background.paper' }}>
        <Typography gutterBottom color="text.primary">
          Upcoming Reminders
        </Typography>
        <List>
          {upcomingReminders.length > 0 ? (
            upcomingReminders.map((entry, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" color="text.primary">
                  {entry.date}
                </Typography>
                <List>
                  {entry.reminders.map((reminder, i) => (
                    <ListItem
                      key={i}
                      sx={{ bgcolor: 'background.default', color: 'text.primary' }}
                    >
                      {reminder}
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))
          ) : (
            <Typography color="text.primary">No upcoming reminders</Typography>
          )}
        </List>
      </Box>
      <Box mb={2}>
        <Calendar
          onChange={handleDateChange}
          value={date}
          view="month"
          locale="en-US"
          className="react-calendar-dark"
        />
      </Box>

      <Box display="flex" mb={2} alignItems="center">
        <TextField
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          label="New Reminder"
          variant="outlined"
          size="small"
        />
        <IconButton onClick={handleAddReminder} color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      <Paper sx={{ padding: 2, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <Typography gutterBottom color="text.primary">
          Reminders for {selectedDateKey}
        </Typography>
        <List>
          {currentReminders.map((reminder, index) => (
            <ListItem
              key={index}
              sx={{ bgcolor: 'background.default', color: 'text.primary' }}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteReminder(selectedDateKey, index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              {reminder}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ReminderCalendar;
