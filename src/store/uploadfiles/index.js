import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filesUploaded: [],
}

export const uploadfiles = createSlice({
  name: 'uploadfiles',
  initialState,
  reducers: {
    pushFilesUploaded: (state, action) => {
      state.filesUploaded = [...state.filesUploaded, ...action.payload];
    },

    setFilesUploaded: (state, action) => {
      state.filesUploaded = action.payload;
    }
  },
});

export const { pushFilesUploaded, setFilesUploaded } = uploadfiles.actions;
export default uploadfiles.reducer;
