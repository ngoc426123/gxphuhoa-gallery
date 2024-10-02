import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filesSelected: [],
  openManPopup: true,
}

export const manfiles = createSlice({
  name: 'manfiles',
  initialState,
  reducers: {
    selectFile: (state, action) => {
      const fileFind = state.filesSelected.some(item => item.id === action.payload.id);

      if (fileFind) {
        state.filesSelected = state.filesSelected.filter(item => item.id !== action.payload.id);
        return;
      }

      state.filesSelected.push({...action.payload, selected: true});
    },

    clearFiles: (state) => {
      state.filesSelected = [];
    },

    setOpenManPopup: (state, action) => {
      state.openManPopup = action.payload
    }
  },
});

export const { selectFile, clearFiles, setOpenManPopup } = manfiles.actions;
export default manfiles.reducer;
