import React from "react";
import { Grid, Typography } from "@mui/material";

const GridExample = () => {
  return (
    <Grid container spacing={2} sx={{
      padding: 2,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      height: "100vh",
    }}>
      {/* First Grid Item */}
      <Grid item xs={6}
      sx={{
        height: "100vh",
      backgroundColor: "#fff",
      }}>
          <Typography>Blank</Typography>
      </Grid>

      {/* Second Grid Item */}
      <Grid item xs={4} sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F2F9F3",
      }}>
          <Typography>Blank</Typography>
      </Grid>
    </Grid>
  );
};

export default GridExample;
