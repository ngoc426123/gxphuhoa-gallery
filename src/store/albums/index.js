import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleAddAlbum: '',
  listImagesAddAlbums: [],
}

export const images = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setTitleAddAlbum: (state, action) => {
      state.titleAddAlbum = action.payload;
    },

    setListImagesAddAlbums: (state, action) => {
      state.listImagesAddAlbums = action.payload;
    },
  },
});

export const { setTitleAddAlbum, setListImagesAddAlbums } = images.actions;
export default images.reducer;
