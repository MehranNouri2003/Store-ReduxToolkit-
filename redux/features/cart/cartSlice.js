import { createSlice } from "@reduxjs/toolkit";
import { sumPrice, sumQuantity } from "../../../utils/helper";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        state.itemsCounter = sumQuantity(state.selectedItems);
        state.total = sumPrice(state.selectedItems);
        state.checkout = false;
      }
    },
    removeItem: (state, action) => {
      const newSelectedItem = state.selectedItems.filter(
        (item) => item.id !== action.payload.id,
      );
      state.selectedItems = newSelectedItem;
      state.itemsCounter = sumQuantity(state.selectedItems);
      state.total = sumPrice(state.selectedItems);
      state.checkout = false;
    },
    increase: (state, action) => {
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.selectedItems[increaseIndex].quantity++;
      state.itemsCounter = sumQuantity(state.selectedItems);
      state.total = sumPrice(state.selectedItems);
      state.checkout = false;
    },
    decrease: (state, action) => {
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.selectedItems[decreaseIndex].quantity--;
      state.itemsCounter = sumQuantity(state.selectedItems);
      state.total = sumPrice(state.selectedItems);
      state.checkout = false;
    },

  },
});


export default cartSlice.reducer;
export const {addItem, removeItem, increase, decrease  } = cartSlice.actions