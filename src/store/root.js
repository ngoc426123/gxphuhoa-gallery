import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userAuthen: false,
  openLoading: false,
  config: {},
}

export const root = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setUserAuthen: (state, action) => {
      state.userAuthen = action.payload;
    },

    setOpenLoading: (state, action) => {
      state.openLoading = action.payload;
    },

    setConfig: (state, action) => {
      state.config = action.payload;
    },
  }
});

export const { setOpenLoading, setUserAuthen, setConfig } = root.actions;
export default root.reducer;
