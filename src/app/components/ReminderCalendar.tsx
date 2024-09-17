import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, IconButton, Paper } from '@mui/material';
import Calendar from 'react-calendar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'react-calendar/dist/Calendar.css';

const ReminderCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState<{ [key: string]: { id: number, content: string }[] }>({});
  const [newReminder, setNewReminder] = useState('');
  const [editReminderId, setEditReminderId] = useState<number | null>(null);
  const [editReminderContent, setEditReminderContent] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('/api/reminders');
        const data = await response.json();
        const groupedReminders = data.reduce((acc: { [key: string]: { id: number, content: string }[] }, reminder: { id: number, date: string, content: string }) => {
          const dateKey = new Date(reminder.date).toDateString();
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push({ id: reminder.id, content: reminder.content });
          return acc;
        }, {});
        setReminders(groupedReminders);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleAddReminder = async () => {
    const dateKey = date.toDateString();
    if (newReminder.trim()) {
      try {
        const response = await fetch('/api/reminders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: date.toISOString().split('T')[0], content: newReminder }),
        });
        if (!response.ok) throw new Error('Failed to add reminder');
        
        const { id } = await response.json(); // Assume the backend returns the new reminder ID
        
        setReminders(prevReminders => ({
          ...prevReminders,
          [dateKey]: [...(prevReminders[dateKey] || []), { id, content: newReminder }],
        }));
        setNewReminder('');
      } catch (error) {
        console.error('Error adding reminder:', error);
      }
    }
  };

  const handleDeleteReminder = async (id: number, dateKey: string, index: number) => {
    try {
      const response = await fetch(`/api/reminders/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete reminder');

      setReminders(prevReminders => ({
        ...prevReminders,
        [dateKey]: prevReminders[dateKey].filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const handleEditReminder = async () => {
    if (editReminderId !== null && editReminderContent.trim()) {
      try {
        const response = await fetch('/api/reminders', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editReminderId, content: editReminderContent }),
        });
        if (!response.ok) throw new Error('Failed to update reminder');
  
        const dateKey = date.toDateString();
        console.log('Current reminders before update:', prevReminders);
        console.log('Updating reminder with ID:', editReminderId);
  
        setReminders(prevReminders => {
          const updatedReminders = prevReminders[dateKey] || [];
          return {
            ...prevReminders,
            [dateKey]: updatedReminders.map(reminder =>
              reminder.id === editReminderId ? { ...reminder, content: editReminderContent } : reminder
            ),
          };
        });
        setEditReminderId(null);
        setEditReminderContent('');
      } catch (error) {
        console.error('Error updating reminder:', error);
      }
    }
  };

  const handleEditClick = (id: number, content: string) => {
    setEditReminderId(id);
    setEditReminderContent(content);
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
                      secondaryAction={
                        <>
                          <IconButton edge="end" onClick={() => handleEditClick(reminder.id, reminder.content)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" onClick={() => handleDeleteReminder(reminder.id, entry.date, i)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      {reminder.content}
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

      {editReminderId !== null && (
        <Box display="flex" mb={2} alignItems="center">
          <TextField
            value={editReminderContent}
            onChange={(e) => setEditReminderContent(e.target.value)}
            label="Edit Reminder"
            variant="outlined"
            size="small"
          />
          <Button onClick={handleEditReminder} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      )}

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
                <>
                  <IconButton edge="end" onClick={() => handleEditClick(reminder.id, reminder.content)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteReminder(reminder.id, selectedDateKey, index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              {reminder.content}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ReminderCalendar;