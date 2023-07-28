import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const searchslice = createSlice({
  name: "issearch",
  initialState,
  reducers: {
    setsearchtrue: (state) => {
      state.value = true;
    },
    setsearchfalse: (state) => {
      state.value = false;
    },
  },
});

export const { setsearchtrue, setsearchfalse } = searchslice.actions;
export default searchslice.reducer;
