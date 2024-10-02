import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filesUploaded: [],
}

export const uploadfiles = createSlice({
  name: 'uploadfiles',
  initialState,
  reducers: {
    setFilesUploaded: (state, action) => {
      state.filesUploaded = [...state.filesUploaded, ...action.payload];
    },
  },
});

export const { setFilesUploaded } = uploadfiles.actions;
export default uploadfiles.reducer;
