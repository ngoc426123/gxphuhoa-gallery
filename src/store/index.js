import { configureStore } from "@reduxjs/toolkit";

// REDUCER
import root from './root';
import uploadfiles from './uploadfiles';
import manfiles from './manfiles';
import images from './images';
import albums from './albums';

export const store = configureStore({
  reducer: {
    root,
    uploadfiles,
    manfiles,
    images,
    albums,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({  serializableCheck: false }),
});
