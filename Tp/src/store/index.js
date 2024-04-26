import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slice/postSlice.js";
import commentSlice from "./slice/commentSlice.js";

const store = configureStore({
  reducer: {
    posts: postSlice,
    comments: commentSlice
  }
});

export default store;