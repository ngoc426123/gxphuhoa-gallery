import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idAlbums: 0,
  titleAlbum: '',
  titleAlbumCompare: '',
  titleAddAlbum: '',
  listImagesAlbums: [],
  listImagesAddAlbums: [],
  listAlbums: [],
}

export const images = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setIdAlbum: (state, action) => {
      state.idAlbums = action.payload;
    },

    setTitleAlbum: (state, action) => {
      state.titleAlbum = action.payload;
    },

    setTitleAlbumCompare: (state, action) => {
      state.titleAlbumCompare = action.payload;
    },
  
    setTitleAddAlbum: (state, action) => {
      state.titleAddAlbum = action.payload;
    },

    setListImagesAlbums: (state, action) => {
      state.listImagesAlbums = action.payload;
    },

    setListImagesAddAlbums: (state, action) => {
      state.listImagesAddAlbums = action.payload;
    },

    setListAlbums: (state, action) => {
      state.listAlbums = action.payload;
    },
  },
});

export const {
  setIdAlbum,
  setTitleAlbum,
  setTitleAlbumCompare,
  setTitleAddAlbum,
  setListImagesAlbums,
  setListImagesAddAlbums,
  setListAlbums,
} = images.actions;
export default images.reducer;
