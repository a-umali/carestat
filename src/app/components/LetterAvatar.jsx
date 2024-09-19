"use client";

import { Box, Avatar, Tooltip } from "@mui/material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

export const LetterAvatar = ({ name }) => {
  const displayLetter = () => {
    if (!name) {
      return <NoAccountsIcon />;
    }

    return name.charAt(0).toUpperCase();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" color={"transparent"}>
      <Tooltip title={name ? name : "Not found"}>
        <Avatar
          sx={{
            width: 75,
            height: 75,
            backgroundColor: 'rgba(255, 145, 0, 0.8)', // Bright background color
            color: 'black', // White text color for contrast
            fontSize: '2rem', // Larger font size
            border: '3px solid #00aaff', // Add a border for better definition
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%', // Ensure it's perfectly round
          }}
        >
          {displayLetter()}
        </Avatar>
      </Tooltip>
    </Box>
  );
};
