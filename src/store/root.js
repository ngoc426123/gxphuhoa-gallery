import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userAuthor: false,
  openLoading: false,
  config: {},
}

export const root = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setUserAuthor: (state, action) => {
      state.userAuthor = action.payload;
    },

    setOpenLoading: (state, action) => {
      state.openLoading = action.payload;
    },

    setConfig: (state, action) => {
      state.config = action.payload;
    },
  }
});

export const { setOpenLoading, setUserAuthor, setConfig } = root.actions;
export default root.reducer;
