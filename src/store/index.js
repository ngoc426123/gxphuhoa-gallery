import { configureStore } from "@reduxjs/toolkit";

// REDUCER
import root from './root';

export const store = configureStore({
  reducer: {
    root,
  }
});
