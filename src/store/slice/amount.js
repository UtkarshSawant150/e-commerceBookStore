import { createSlice } from "@reduxjs/toolkit";

const amountSlice = createSlice({
  name: "amount",
  initialState: {
    quantity: 0,
    totalAmount: 0,
  },
  reducers: {
    add(state, { payload }) {
      state.quantity = payload.qty;
      state.totalAmount += payload.price * payload.qty;
    },
    subtract(state, { payload }) {
      state.quantity = payload.qty;
      state.totalAmount -= payload.price * payload.qty;
    },
    reset(state) {
      state.totalAmount = 0;
      state.quantity = 0;
    },
  },
});

export const { add, subtract, reset } = amountSlice.actions;
export default amountSlice.reducer;
