import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const inputvalueslice = createSlice({
  name: "inputvalue",
  initialState,
  reducers: {
    setinputvalue: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setinputvalue } = inputvalueslice.actions;
export default inputvalueslice.reducer;
