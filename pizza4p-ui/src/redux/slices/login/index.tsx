import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: false,
};

const loginForm = createSlice({
  name: "toggleLogin",
  initialState,
  reducers: {
    toggleLogin: (state = initialState, data) => {
      const { payload } = data;
      state.showLogin = payload;
    },
  },
});

export const { toggleLogin } = loginForm.actions;

export default loginForm.reducer;
