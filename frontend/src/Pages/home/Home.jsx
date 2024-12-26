import React from "react";
import "./Home.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Button,
  useTheme,
  IconButton,
  styled,
  Badge,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deQuantity, increasQuantity } from "../../Redux/cartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const Home = () => {
  // @ts-ignore
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );

  const productQuantity = (itemAPI) => {
    const mrProduct = selectedProducts.find((itmeUder) => {
      return itmeUder.id === itemAPI.id;
    });
    return mrProduct.quantity;
  };

  const theme = useTheme();
  // deta => all product
  const { data, error, isLoading } = useGetproductsByNameQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          ERROR
        </Typography>
      </Box>
    );
  }

  if (data) {
    return (
      <Stack
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, index) => {
          return (
            <Card
              className="card"
              key={item.id}
              sx={{
                maxWidth: 277,
                mb: 6,
                mx: 2,
                bgcolor: theme.palette.background.paper,
              }}
            >
              <CardMedia
                component="img"
                height="277"
                image={item.imageLink[0]}
                onClick={() => {
                  navigate(`product-details/${item.id}`);
                }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                {selectedProductsID.includes(item.id) ? (
                  <div
                    dir="rtl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(increasQuantity(item));
                      }}
                    >
                      <Add fontSize="small" sx={{ ml: "10px" }} />
                    </IconButton>

                    <StyledBadge
                      badgeContent={productQuantity(item)}
                      color="primary"
                    />

                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(deQuantity(item));
                      }}
                    >
                      <Remove fontSize="small" sx={{ mr: "10px" }} />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      p: 1,
                      lineHeight: "1.1",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(addToCart(item));
                    }}
                  >
                    <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> Add To
                    Crart
                  </Button>
                )}

                <Typography
                  sx={{ mr: 1 }}
                  variant="body1"
                  color={theme.palette.error.light}
                >
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
