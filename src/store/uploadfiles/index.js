import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  openProgressPopup: true,
}

export const uploadfiles = createSlice({
  name: 'uploadfiles',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },

    setOpenProgressPopup: (state, action) => {
      state.openProgressPopup = action.payload
    }
  },
});

export const { setFiles, setOpenProgressPopup } = uploadfiles.actions;
export default uploadfiles.reducer;
