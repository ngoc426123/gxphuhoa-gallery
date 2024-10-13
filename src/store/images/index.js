import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listImages: [],
  start: 0,
  perpage: 60,
  more: true,
}

export const images = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setListImages: (state, action) => {
      state.listImages = [...state.listImages, ...action.payload];
    },

    setStart: (state, action) => {
      state.start = action.payload;
    },

    setMore: (state, action) => {
      state.more = action.payload;
    }
  },
});

export const { setListImages, setStart, setMore, } = images.actions;
export default images.reducer;
