'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import {
  Paper,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CardForm from '../components/CardForm';
import LineChart from '../components/LineChart';
import ReminderCalendar from '../components/ReminderCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddchartIcon from '@mui/icons-material/Addchart';
import CareTeam from '../components/CareTeam';
import CloseIcon from '@mui/icons-material/Close';
import UserCard from '../components/UserCard';
import PatientForm from '../components/PatientForm';
import BmiCalculator from '../components/BmiCalculator';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CalculateIcon from '@mui/icons-material/Calculate';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Navbar from '../components/Navbar';

// Define types for component state
type State = {
  openCalendarModal: boolean;
  openChartModal: boolean;
  openBmiModal: boolean;
  isDrawerOpen: boolean;
  openPatientFormModal: boolean;
};

const MyPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loaded
    if (!session) signIn(); // Redirect to sign-in if not authenticated
  }, [session, status]);

  // State management for modals and drawer
  const [state, setState] = useState<State>({
    openCalendarModal: false,
    openChartModal: false,
    openBmiModal: false,
    isDrawerOpen: false,
    openPatientFormModal: false,
  });

  const handleOpenCalendarModal = () => setState(prev => ({ ...prev, openCalendarModal: true }));
  const handleCloseCalendarModal = () => setState(prev => ({ ...prev, openCalendarModal: false }));

  const handleOpenChartModal = () => setState(prev => ({ ...prev, openChartModal: true }));
  const handleCloseChartModal = () => setState(prev => ({ ...prev, openChartModal: false }));

  const handleOpenBmiModal = () => setState(prev => ({ ...prev, openBmiModal: true }));
  const handleCloseBmiModal = () => setState(prev => ({ ...prev, openBmiModal: false }));

  const toggleDrawer = (open: boolean) => () => {
    setState(prev => ({ ...prev, isDrawerOpen: open }));
  };

  const handleOpenPatientFormModal = () => setState(prev => ({ ...prev, openPatientFormModal: true }));
  const handleClosePatientFormModal = () => setState(prev => ({ ...prev, openPatientFormModal: false }));

  // If the session is still loading, you might want to return a loading indicator
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  return (
    
    <Grid
      container
      spacing={2}
      style={{
        backgroundImage: `url('/images/newbg.png')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        minHeight: '100vh',
        paddingTop: '64px',
        boxSizing: 'border-box',
      }}
    >
      <Navbar></Navbar>
      {/* Header Section */}
      <Grid item xs={12} style={{ marginBottom: 0 }}>
      <Box sx={{ pt: 10, color: 'transparent' }}> {/* pt: 10 will add padding-top */}
  <Paper
    style={{
      padding: '16px',
      marginBottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography variant="h4" align="center" style={{ fontWeight: 'bold', color: 'black' }}>
      <UserCard />
    </Typography>
  </Paper>
</Box>

      </Grid>

      {/* Right Column with Care Team Section */}
      <Grid
        item
        xs={12}
        md={4}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer(true)}
          startIcon={<HistoryEduIcon />}
          style={{ marginBottom: '8px', width: '100%' }}
        >
          <Typography variant="h6">Open Tools Drawer</Typography>
        </Button>
        <Paper style={{ padding: '16px', flex: '1', minHeight: '400px' }}>
          <Typography variant="subtitle1">Care Team and Recent Providers</Typography>
          <CareTeam />
        </Paper>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper style={{ padding: '16px', minHeight: '450px' }}>
              <CardForm />
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Drawer 
  anchor="left" 
  open={state.isDrawerOpen} 
  onClose={toggleDrawer(false)} 
  sx={{ backdropFilter: 'none' }} // Prevents blur effect outside
>
  <Box role="presentation" sx={{ width: 300, p: 3, backgroundColor: 'white' }}>
    <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
      Tools
    </Typography>
    <List>
      {[
        { text: "Calendar/Reminders", icon: <CalendarMonthIcon />, modalState: 'openCalendarModal' },
        { text: "Blood Sugar Check", icon: <AddchartIcon />, modalState: 'openChartModal' },
        { text: "BMI Calculator", icon: <CalculateIcon />, modalState: 'openBmiModal' },
        { text: "Patient Form", icon: <ContactEmergencyIcon />, modalState: 'openPatientFormModal' },
      ].map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton 
            onClick={() => setState(prev => ({ ...prev, [item.modalState]: true }))} 
            sx={{ 
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              borderRadius: 1,
            }}>
            <ListItemIcon sx={{ color: 'black', fontSize: '1.5rem' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: 'black' }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>


      {/* Calendar Modal */}
      <Modal
  open={state.openCalendarModal}
  onClose={handleCloseCalendarModal}
  aria-labelledby="calendar-modal-title"
  aria-describedby="calendar-modal-description"
>
    <Box
      sx={{
        width: '90%',
        maxWidth: 800,
        maxHeight: '90vh',
        padding: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        position: 'relative',
        overflowY: 'auto',
        margin: '0 auto', // Center the inner box
      }}
    >
      <IconButton
        onClick={handleCloseCalendarModal}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'red',
        }}
      >
        <CloseIcon />
      </IconButton>
      <ReminderCalendar />
    </Box>
</Modal>

      {/* Line Chart Modal */}
      <Modal
        open={state.openChartModal}
        onClose={handleCloseChartModal}
        aria-labelledby="line-chart-modal-title"
        aria-describedby="line-chart-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              width: '90%',
              maxWidth: 700,
              maxHeight: '90vh',
              padding: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              color: 'darkblue',
              position: 'relative',
              overflowY: 'auto',
            }}
          >
            <IconButton
              onClick={handleCloseChartModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'red',
              }}
            >
              <CloseIcon />
            </IconButton>
            <LineChart />
          </Box>
        </Box>
      </Modal>

      {/* BMI Calculator Modal */}
      <Modal
        open={state.openBmiModal}
        onClose={handleCloseBmiModal}
        aria-labelledby="bmi-calculator-modal-title"
        aria-describedby="bmi-calculator-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              width: '90%',
              maxWidth: 700,
              maxHeight: '90vh',
              padding: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              color: 'darkblue',
              position: 'relative',
              overflowY: 'auto',
            }}
          >
            <IconButton
              onClick={handleCloseBmiModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'red',                                fontSize: '1.5rem'
              }}
            >
              <CloseIcon />
            </IconButton>
            <BmiCalculator />
          </Box>
        </Box>
      </Modal>

      {/* Patient Form Modal */}
      <Modal
        open={state.openPatientFormModal}
        onClose={handleClosePatientFormModal}
        aria-labelledby="patient-form-modal-title"
        aria-describedby="patient-form-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              width: '90%',
              maxWidth: 700,
              maxHeight: '90vh',
              padding: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              color: 'darkblue',
              position: 'relative',
              overflowY: 'auto',
            }}
          >
            <IconButton
              onClick={handleClosePatientFormModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'red',
                fontSize: '1.5rem'
              }}
            >
              <CloseIcon />
            </IconButton>
            <PatientForm />
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default MyPage;
