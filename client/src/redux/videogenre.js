import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: '',
};

const videoslice = createSlice({
  name: "videogenre",
  initialState,
  reducers: {
    setvideogenre: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setvideogenre } = videoslice.actions;
export default videoslice.reducer;
