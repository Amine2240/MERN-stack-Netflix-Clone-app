import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const mylistslice = createSlice({
  name: "mylistarray",
  initialState,
  reducers: {
    additem: (state, action) => {
      // const tmpitem = state.value.find((element) => element == action.payload);
      // console.log('tmpitem' , tmpitem);
      
      if (!state.value.includes(action.payload) ) {
        // state.value = [...state.value, action.payload];
        state.value.push(action.payload)
      } else {
        // return state.value;
        console.log('already existed');
      }
    },
    removeitem: (state, action) => {
      state.value = state.value.filter((item) => {
        if (item.id === action.payload.id) {
          return false;
        } else {
          return true;
        }
      });
    },
    setmylistarray: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { additem, removeitem, setmylistarray } = mylistslice.actions;
export default mylistslice.reducer;
