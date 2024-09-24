import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  openManPopup: true,
}

export const manfiles = createSlice({
  name: 'manfiles',
  initialState,
  reducers: {
    selectFile: (state, action) => {
      const fileFind = state.files.some(item => item.id === action.payload.id);

      if (fileFind) {
        state.files = state.files.filter(item => item.id !== action.payload.id);
        return;
      }

      state.files.push({...action.payload, selected: true});
    },

    setOpenManPopup: (state, action) => {
      state.openManPopup = action.payload
    }
  },
});

export const { selectFile, setOpenManPopup } = manfiles.actions;
export default manfiles.reducer;
