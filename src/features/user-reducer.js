import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = "";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
    userUpdate: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { login, logout, userUpdate } = userSlice.actions;

export default userSlice.reducer;
