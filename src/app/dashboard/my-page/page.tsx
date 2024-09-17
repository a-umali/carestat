'use client';

import React, { useState } from 'react';
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
import CardForm from '../../components/CardForm';
import LineChart from '../../components/LineChart';
import ReminderCalendar from '../../components/ReminderCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddchartIcon from '@mui/icons-material/Addchart';
import CareTeam from '../../components/CareTeam';
import CloseIcon from '@mui/icons-material/Close';
import UserCard from '../../components/UserCard';
import PatientForm from '../../components/PatientForm';
import BmiCalculator from '../../components/BmiCalculator';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CalculateIcon from '@mui/icons-material/Calculate';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

// Define types for component state
type State = {
  openCalendarModal: boolean;
  openChartModal: boolean;
  openBmiModal: boolean;
  isDrawerOpen: boolean;
  openPatientFormModal: boolean;
};

const MyPage: React.FC = () => {
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

  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundImage: `url('/images/dashbg.png')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        minHeight: '100vh',
        paddingTop: '64px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section */}
      <Grid item xs={12} style={{ marginBottom: 0 }}>
        <Box
          style={{
            padding: '16px',
            marginBottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" align="center" style={{ fontWeight: 'bold' }}>
            <UserCard />
          </Typography>
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
          Open Tools Drawer
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

      {/* Drawer Component */}
      <Drawer anchor="left" open={state.isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box role="presentation" style={{ width: 300, padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Tools
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenCalendarModal}>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenChartModal}>
                <ListItemIcon>
                  <AddchartIcon />
                </ListItemIcon>
                <ListItemText primary="Line Chart" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenBmiModal}>
                <ListItemIcon>
                  <CalculateIcon />
                </ListItemIcon>
                <ListItemText primary="BMI Calculator" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenPatientFormModal}>
                <ListItemIcon>
                  <ContactEmergencyIcon />
                </ListItemIcon>
                <ListItemText primary="Patient Form" />
              </ListItemButton>
            </ListItem>
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
              onClick={handleCloseCalendarModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'darkblue',
              }}
            >
              <CloseIcon />
            </IconButton>
            <ReminderCalendar />
          </Box>
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
                color: 'darkblue',
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
                color: 'darkblue',
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
                color: 'darkblue',
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
