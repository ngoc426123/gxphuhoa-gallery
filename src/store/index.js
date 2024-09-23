import { configureStore } from "@reduxjs/toolkit";

// REDUCER
import root from './root';
import uploadfiles from './uploadfiles';

export const store = configureStore({
  reducer: {
    root,
    uploadfiles,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({  serializableCheck: false }),
});
