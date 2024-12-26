import React from "react";

import { Box, Typography, useTheme } from "@mui/material";


const NotFound = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography color={theme.palette.error.main} variant="h4">
        There is no disin yet
        <br />
        <br />
        please try again later..
      </Typography>
    </Box>
  );
};

export default NotFound;
