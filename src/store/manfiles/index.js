import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  openManPopup: true,
}

export const manfiles = createSlice({
  name: 'manfiles',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },

    setOpenManPopup: (state, action) => {
      state.openManPopup = action.payload
    }
  },
});

export const { setFiles, openManPopup } = manfiles.actions;
export default manfiles.reducer;
