import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
}

export const uploadfiles = createSlice({
  name: 'uploadfiles',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { setFiles } = uploadfiles.actions;
export default uploadfiles.reducer;
