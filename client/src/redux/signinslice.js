import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const signinslice = createSlice({
  name: "issignin",
  initialState,
  reducers: {
    settrue: (state) => {
      state.value = true;
    },
    setfalse: (state) => {
      state.value = false;
    },
  },
});

export const { settrue, setfalse } = signinslice.actions;

export default signinslice.reducer;
