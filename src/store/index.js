import { configureStore } from "@reduxjs/toolkit";
import LoggingSlice from "./slice/index";
import amountSlice from "./slice/amount";

export const store = configureStore({
  reducer: {
    logging: LoggingSlice,
    amount: amountSlice,
  },
});
