import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userAuthor: false,
  openLoading: false,
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
  }
});

export const { setOpenLoading, setUserAuthor } = root.actions;
export default root.reducer;
