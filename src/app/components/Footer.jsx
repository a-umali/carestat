import { Box, Typography } from "@mui/material";

export const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <footer>
      <Box
        padding={"10px"}
        display="flex"
        position={"static"}
        bottom={0}
        bgcolor={"#1976d2"}
        justifyContent={"right"}
        px={"20px"}
      >
        <Typography
          variant="subtitle1"
          fontSize={"small"}
          color="text.secondary"
          alignContent={"center"}
        >
          Template designed by someone during an IoD class - {currentDate}
        </Typography>
      </Box>
    </footer>
  );
};
