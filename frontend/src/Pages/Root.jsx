import React, { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Appbar from "MUI-components/Appbae";
import Drawerr from "MUI-components/Drawer";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import getDesignTokens from "styles/MyTheme";

const drawerWidth = 240;

const Root = () => {
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );

  const [noneORblock, setnoneORblock] = useState("none");
  const [drawerTyper, setdrawerTyper] = useState("permanent");

  const showDrawar = () => {
    setdrawerTyper("temporary");
    setnoneORblock("block");
  };

  const higDrawar = () => {
    setdrawerTyper("permanent");
    setnoneORblock("none");
  };


//===========================
   //قراه عن الهوك useMemo 
//===========================
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Appbar drawerWidth={drawerWidth} showDrawar={showDrawar} />

        <Drawerr
          drawerWidth={drawerWidth}
          setmyMode={setmyMode}
          noneORblock={noneORblock}
          drawerTyper={drawerTyper}
          higDrawar={higDrawar}
        />

        <Box
          // className="bodrawerTyper
          component="main"
          sx={{
            ml: { sm: `${drawerWidth}px` },
            display: "flex",
            justifyContent: "center",
            mt: "66px",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Root;
