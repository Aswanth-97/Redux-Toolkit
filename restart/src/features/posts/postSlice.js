import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "post titile 1", content: "post 1 content" },
  { id: "2", title: "post titile 2", content: "post 2 content" },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload);
    },
  },
});
export default postSlice.reducer;

export const { postAdded } = postSlice.actions;

export const selectAllPosts = (state) => state.posts;
