import React from "react";
import { Grid, Typography } from "@mui/material";

const HomePage = () => {
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
      }}
    >
      {/* First Grid Item */}
      <Grid
        item
        xs={6}
        sx={{
          height: "100%",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2, // Added padding for consistency
        }}
      >
        <Typography>Blank</Typography>
      </Grid>

      {/* Second Grid Item */}
      <Grid
        item
        xs={4}
        sx={{
          height: "100%",
          backgroundColor: "#F2F9F3",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2, // Added padding for consistency
        }}
      >
        <Typography>Blank</Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
