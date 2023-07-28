import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signinslice";
import searchReducer from "./searchslice";
import inputvalueReducer from "./inputvalueslice";
import videogenreReducer from "./videogenre";
import mylistReducer from "./mylistslice";
// import likedsavedsliceReducer from "./likedislikeslice";

export const store = configureStore({
  reducer: {
    issignin: signinReducer,
    issearch: searchReducer,
    inputvalue: inputvalueReducer,
    videogenre: videogenreReducer,
    mylistarray: mylistReducer,
    // likedsavedslice: likedsavedsliceReducer,
  },
});
