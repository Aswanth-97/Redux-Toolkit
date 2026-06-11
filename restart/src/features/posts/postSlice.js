import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPost = createAsyncThunk("post/fetchPost", async () => {
  try {
    const response = await axios.get(postsUrl);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addPost = createAsyncThunk("post/addPost", async (initalpost) => {
  try {
    const response = await axios.post(postsUrl, initalpost);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updatePost = createAsyncThunk(
  "update/updatePost",
  async (initalpost) => {
    const { id } = initalpost;
    try {
      const response = await axios.put(`${postsUrl}/${id}`, initalpost);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  },
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;

      const existingPost = state.posts.find((post) => post.id == postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        //adding date and reactions

        let min = 1;
        const lodedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsup: 0,
            wow: 0,
            hart: 0,
          };

          return post;
        });

        state.posts = state.posts.concat(lodedPosts);
        // state.posts = lodedPosts;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsup: 0,
          wow: 0,
          hart: 0,
        };

        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("update not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id == id);
        state.posts = [...posts, action.payload];
      });
  },
});
export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

export const getPostStatus = (state) => state.posts.status;

export const getPostError = (state) => state.posts.error;

export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
