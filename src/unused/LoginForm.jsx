import React, { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  Paper,
  Box,
  Typography,
  Alert,
  Grid,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMainContext } from "../store/mainStore";
import LoginIcon from "@mui/icons-material/Login";
import backgroundImage from "../images/background.jpg"; 
import ForumIcon from '@mui/icons-material/Forum';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export const LoginForm = () => {
  // States
  const { handleUpdateUser } = useMainContext();
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  const standardTopPadding = { pt: "10px" };
  const standardTopMargin = { mt: "10px" };

  useEffect(() => {
    if (hasSubmit) {
      navigateTo("/my-page");
    }
  }, [hasSubmit, navigateTo]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/user-auth", { email, password })
      .then((response) => {
        if (response.data.auth_token) {
          handleUpdateUser(response.data);
          setHasSubmit(true);
        }
      })
      .catch((error) => {
        console.error("User auth error", error);
      });
  };

  const displayAlert = () => {
    return hasSubmit ? (
      <Alert severity="success">Welcome back, {email}</Alert>
    ) : null;
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Column with xs=8 */}
      <Grid
        item
        xs={6}
        sx={{
          padding: 2,
          height: "80vh",
        }}
      >
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
        <Typography variant="h4">Welcome to my website</Typography>
        <Box>
        <h3><ForumIcon fontSize="large"/> Communicate with your doctor</h3>
        <p>Get answers to your medical questions from the comfort of your own home</p>
        </Box>
        <Box>
        <h3><FolderIcon fontSize="large"/> Save your medical records</h3>
        <p>No more waiting for a phone call or letter to view your results and your doctor's comments within days</p>
        </Box>
        <Box>
        <h3><CalendarMonthIcon fontSize="large"/> Manage your appointments</h3>
        <p>Schedule your next appointment, or view details of your past and upcoming appointments</p>
        </Box>
        </Paper>
      </Grid>

      {/* Column with xs=4 */}
      <Grid
        item
        xs={4}
        sx={{
          padding: 2,
          height: "80vh",
        }}
      >
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.9)", 
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Login
          </Typography>
          {displayAlert()}
          <FormControl fullWidth>
            <TextField
              label="Email"
              variant="outlined"
              sx={standardTopPadding}
              onChange={handleEmailChange}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              sx={standardTopPadding}
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember Me"
            />
            <Button
              size="large"
              variant="contained"
              sx={standardTopMargin}
              disabled={!email || !password}
              onClick={handleSubmit}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Box sx={standardTopMargin}>
              <Link to="/register">Register</Link>
            </Box>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
};
