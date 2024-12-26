import React from "react";
import {
  Divider,
  Drawer,
  List,
  useTheme,
  IconButton,
  Badge,
  styled,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Brightness4,
  Brightness7,
  Home,
  ShoppingCart,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Drawerr = ({
  drawerWidth,
  setmyMode,
  noneORblock,
  drawerTyper,
  higDrawar,
}) => {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.carttt);

  const currentLocation = useLocation();

  const navigate = useNavigate();
  const thrme = useTheme();

  const myList = [
    { text: "Home", icon: <Home />, path: "/" },
    {
      text: "Cart",
      icon: (
        <StyledBadge badgeContent={selectedProducts.length} color="secondary">
          <ShoppingCart />
        </StyledBadge>
      ),
      path: "/Cart",
    },
  ];

  return (
    <Drawer
      sx={{
        display: { xs: noneORblock, sm: "block" },
        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      variant={drawerTyper}
      anchor="left"
      open={true}
      onClose={() => {
        higDrawar();
      }}
    >
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", mb: "14px" }}
          disablePadding
        >
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                thrme.palette.mode === "dark" ? "light" : "dark"
              );

              setmyMode(thrme.palette.mode === "light" ? "dark" : "light");
            }}
            color="inherit"
          >
            {thrme.palette.mode === `dark` ? (
              <Brightness7 sx={{ color: "orange" }} />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
        </ListItem>

        <Divider />

        {myList.map((item) => {
          return (
            <ListItem
              key={item.path}
              sx={{
                bgcolor:
                  currentLocation.pathname === item.path
                    ? // @ts-ignore
                      thrme.palette.favColor.main
                    : null,
              }}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Drawerr;
