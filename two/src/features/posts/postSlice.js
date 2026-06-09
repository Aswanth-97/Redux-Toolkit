import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "The first",
    content: "the first content ",
    date: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    reactions: {
      thumbsup: 0,
      wow: 0,
      hart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: 2,
    title: "The second",
    content: "the second content ",
    date: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    reactions: {
      thumbsup: 0,
      wow: 0,
      hart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: 3,
    title: "The third",
    content: "the third content ",
    date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    reactions: {
      thumbsup: 0,
      wow: 0,
      hart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsup: 0,
              wow: 0,
              hart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionsAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id == postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionsAdded } = postSlice.actions;

export default postSlice.reducer;
