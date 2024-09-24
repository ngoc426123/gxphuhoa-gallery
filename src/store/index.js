import { configureStore } from "@reduxjs/toolkit";

// REDUCER
import root from './root';
import uploadfiles from './uploadfiles';
import manfiles from './manfiles';

export const store = configureStore({
  reducer: {
    root,
    uploadfiles,
    manfiles,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({  serializableCheck: false }),
});
