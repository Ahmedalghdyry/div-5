import React from "react";
import {
  Toolbar,
  AppBar,
  Avatar,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const Appbar = ({ drawerWidth, showDrawar }) => {
  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
      }}
      position="static"
    >
      <Toolbar>
        <IconButton
          onClick={() => {
            showDrawar();
          }}
          sx={{ color: "inherit", display: { sm: "none" }, mr: "9px" }}
        >
          <Menu />
        </IconButton>
        <Link
          sx={{
            flexGrow: 1,
            textDecoration: "none",
          }}
          color="inherit"
          href="/"
        >
          Online store
        </Link>

        <Typography mr={2} variant="body1" color="inherit">
          Ahmed lbrahim
        </Typography>
        <Avatar
          alt="Remy Sharp"
          src="./imges/c74cc044-465e-4abb-9e35-0fc9dede6b07.jpg"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
