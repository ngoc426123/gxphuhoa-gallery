import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  openProgressPopup: true,
}

export const uploadfile = createSlice({
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

export const { setFiles, setOpenProgressPopup } = uploadfile.actions;
export default uploadfile.reducer;
