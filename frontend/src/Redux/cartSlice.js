import { createSlice } from "@reduxjs/toolkit";

// use "useuseSelector" to gat array
const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],

  selectedProductsID: localStorage.getItem("selectedProductsID")
    ? JSON.parse(localStorage.getItem("selectedProductsID"))
    : [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  // action.payload ==> products From API القيمه التي بداخل الاقواص <======= //
  reducers: {
    addToCart: (state, action) => {
      // action.payload ==> products From API القيمه التي بداخل الاقواص <======= //
      const productWithQuantity = { ...action.payload, quantity: 1 };

      state.selectedProducts.push(productWithQuantity);
      state.selectedProductsID.push(action.payload.id);

      //{  سميه زي م انتا عوز(selectedProducts,selectedProductsID)kay} اسم ال اختياري
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },

    increasQuantity: (state, action) => {
      // action.payload ==> products From USER القيمه التي بداخل الاقواص <======= //
      const incresdedProuct = state.selectedProducts.find((iteme) => {
        return iteme.id === action.payload.id;
      });

      incresdedProuct.quantity += 1;
      //{  سميه زي م انتا عوز(selectedProducts,selectedProductsID)kay} اسم ال اختياري
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    deQuantity: (state, action) => {
      // state.value += action.payload
      const incresdedProuct = state.selectedProducts.find((iteme) => {
        return iteme.id === action.payload.id;
      });
      incresdedProuct.quantity -= 1;

      if (incresdedProuct.quantity === 0) {
        // dlete the selected product
        const newArr = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        const newArr2 = state.selectedProductsID.filter((item) => {
          return item !== action.payload.id;
        });

        state.selectedProducts = newArr;
        state.selectedProductsID = newArr2;

        localStorage.setItem(
          "selectedProductsID",
          JSON.stringify(state.selectedProductsID)
        );
      }
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    deletProduct: (state, action) => {
      // dlete the selected product
      const newArr = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });
      const newArr2 = state.selectedProductsID.filter((item) => {
        return item !== action.payload.id;
      });

      state.selectedProducts = newArr;
      state.selectedProductsID = newArr2;

      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
  },
});

// export متنساس تعملها
export const { addToCart, increasQuantity, deQuantity, deletProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
