import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listImages: [],
}

export const images = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setListImages: (state, action) => {
      state.listImages = action.payload;
    },
  },
});

export const { setListImages } = images.actions;
export default images.reducer;
