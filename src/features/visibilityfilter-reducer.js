import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = "";

export const visibilityFilterSlice = createSlice({
  name: "visibilityFilter",
  initialState: { value: initialStateValue },
  reducers: {
    filter: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { filter } = visibilityFilterSlice.actions;

export default visibilityFilterSlice.reducer;
