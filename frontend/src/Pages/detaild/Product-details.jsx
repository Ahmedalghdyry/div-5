import React, { useRef, useState } from "react";
import "./Product-details.css";
import { useGetonPproductQuery } from "../../Redux/productsApi";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import DetailsThumb from "./DetailsThumb";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deQuantity, increasQuantity } from "../../Redux/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );
  let { id } = useParams();

  const [index, setindex] = useState(0);

  // data => only one product
  const { data, error, isLoading } = useGetonPproductQuery(id);
  const myRef = useRef(null);

  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  const productQuantity = (itemAPI) => {
    const mrProduct = selectedProducts.find((itmeUder) => {
      return itmeUder.id === itemAPI.id;
    });
    return mrProduct.quantity;
  };

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
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {/* <button className="cart">Add to cart</button> */}

            {selectedProductsID.includes(data.id) ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(deQuantity(data));
                  }}
                >
                  <Remove fontSize="small" sx={{ mr: "10px" }} />
                </IconButton>

                <StyledBadge
                  badgeContent={productQuantity(data)}
                  color="primary"
                />

                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(increasQuantity(data));
                  }}
                >
                  <Add fontSize="small" sx={{ ml: "10px" }} />
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
                  dispatch(addToCart(data));
                }}
              >
                <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> Add To Crart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
