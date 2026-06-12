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

export const deletePost = createAsyncThunk(
  "delete/deletePost",
  async (initalpost) => {
    const { id } = initalpost;
    try {
      const response = await axios.delete(`${postsUrl}/${id}`);
      if (response?.status == 200) {
        return initalpost;
      }
      return `${response?.status}:${response?.statusText}`;
    } catch (error) {
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
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      // .addCase(updatePost.fulfilled, (state, action) => {
      //   if (!action.payload?.id) {
      //     console.log("update not complete");
      //     return;
      //   }

      //   const index = state.posts.findIndex(
      //     (post) => post.id === action.payload.id,
      //   );

      //   if (index !== -1) {
      //     state.posts[index] = {
      //       ...state.posts[index],
      //       ...action.payload,
      //       date: new Date().toISOString(),
      //     };
      //   }
      // })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("delete not complete");
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
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
