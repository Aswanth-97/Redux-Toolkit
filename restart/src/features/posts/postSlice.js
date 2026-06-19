import {
  createSlice,
  createSelector,
  // createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
// import axios from "axios";
import { apiSlice } from "../api/apiSlice";

// const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// const initialState = postAdapter.getInitialState({
//   status: "idle",
//   error: null,
//   count: 0,
// });

// export const fetchPost = createAsyncThunk("post/fetchPost", async () => {
//   try {
//     const response = await axios.get(postsUrl);
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// });

// export const addPost = createAsyncThunk("post/addPost", async (initalpost) => {
//   try {
//     const response = await axios.post(postsUrl, initalpost);
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// });

// export const updatePost = createAsyncThunk(
//   "update/updatePost",
//   async (initalpost) => {
//     const { id } = initalpost;
//     try {
//       const response = await axios.put(`${postsUrl}/${id}`, initalpost);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return error.message;
//     }
//   },
// );

// export const deletePost = createAsyncThunk(
//   "delete/deletePost",
//   async (initalpost) => {
//     const { id } = initalpost;
//     try {
//       const response = await axios.delete(`${postsUrl}/${id}`);
//       if (response?.status == 200) {
//         return initalpost;
//       }
//       return `${response?.status}:${response?.statusText}`;
//     } catch (error) {
//       return error.message;
//     }
//   },
// );

// const postSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     increaseCount: (state, action) => {
//       state.count = state.count + 1;
//     },

//     reactionAdded: (state, action) => {
//       const { postId, reaction } = action.payload;

//       // const existingPost = state.posts.find((post) => post.id == postId);
//       const existingPost = state.entities[postId]; // after nomalized  state
//       if (existingPost) {
//         existingPost.reactions[reaction]++;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPost.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPost.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         //adding date and reactions

//         let min = 1;
//         const lodedPosts = action.payload.map((post) => {
//           post.date = sub(new Date(), { minutes: min++ }).toISOString();
//           post.reactions = {
//             thumbsup: 0,
//             wow: 0,
//             hart: 0,
//           };

//           return post;
//         });

//         // state.posts = state.posts.concat(lodedPosts);

//         postAdapter.upsertMany(state, lodedPosts); // after nomalized  state
//       })
//       .addCase(fetchPost.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addPost.fulfilled, (state, action) => {
//         // Fix for API post IDs:
//         // Creating sortedPosts & assigning the id
//         // would be not be needed if the fake API
//         // returned accurate new post IDs
//         const sortedPosts = state.posts.sort((a, b) => {
//           if (a.id > b.id) return 1;
//           if (a.id < b.id) return -1;
//           return 0;
//         });
//         action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
//         // End fix for fake API post IDs

//         action.payload.userId = Number(action.payload.userId);
//         action.payload.date = new Date().toISOString();
//         action.payload.reactions = {
//           thumbsUp: 0,
//           wow: 0,
//           heart: 0,
//           rocket: 0,
//           coffee: 0,
//         };
//         console.log(action.payload);
//         // state.posts.push(action.payload);
//         postAdapter.addOne(state, action.payload); // after nomalized  state
//       })
//       .addCase(updatePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("Update could not complete");
//           console.log(action.payload);
//           return;
//         }
//         const { id } = action.payload;
//         action.payload.date = new Date().toISOString();
//         const posts = state.posts.filter((post) => post.id !== id);
//         // state.posts = [...posts, action.payload];
//         postAdapter.upsertOne(state, action.payload); // after nomalized  state
//       })
//       // .addCase(updatePost.fulfilled, (state, action) => {
//       //   if (!action.payload?.id) {
//       //     console.log("update not complete");
//       //     return;
//       //   }

//       //   const index = state.posts.findIndex(
//       //     (post) => post.id === action.payload.id,
//       //   );

//       //   if (index !== -1) {
//       //     state.posts[index] = {
//       //       ...state.posts[index],
//       //       ...action.payload,
//       //       date: new Date().toISOString(),
//       //     };
//       //   }
//       // })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("delete not complete");
//           return;
//         }
//         const { id } = action.payload;
//         // const posts = state.posts.filter((post) => post.id !== id);
//         // state.posts = posts;
//         postAdapter.removeOne(state, id);
//       });
//   },
// });
// export default postSlice.reducer;

// export const { increaseCount, reactionAdded } = postSlice.actions;

const initialState = postAdapter.getInitialState({});

export const exendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        let min = 1;
        const lodedPosts = responseData.map((post) => {
          if (!post?.date) {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          }
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };

          return post;
        });

        return postAdapter.setAll(initialState, lodedPosts);
      },

      providesTags: (result, error, arg) => [
        { type: "post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "post", id })),
      ],
    }),

    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData) => {
        let min = 1;
        const lodedPosts = responseData.map((post) => {
          if (!post?.date) {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          }
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };

          return post;
        });

        return postAdapter.setAll(initialState, lodedPosts);
      },

      providesTags: (result, error, arg) => {
        console.log(result);
        return [...result.ids.map((id) => ({ type: "post", id }))];
      },
    }),

    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userid),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "post", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      query: (initalPost) => ({
        url: `/posts/${initalPost.id}`,
        method: "PUT",
        body: { ...initalPost, date: new Date().toISOString() },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        body: { reactions },
      }),
      async onQueryStarted(
        { postId, reactions },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          exendedApiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              const post = draft.entities[postId];
              if (post) {
                post.reactions = reactions;
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddNewPostMutation,
  useAddReactionMutation,
} = exendedApiSlice;
//return the query result obj
export const selectPostsResult = exendedApiSlice.endpoints.getPosts.select();

//memoized selector creation
const selectPostsData = createSelector(
  selectPostsResult,
  (postResult) => postResult.data, //normalized state obj with ids and entities
);

export const {
  selectAll: selectAllPosts,
  selectById: getPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => selectPostsData(state) ?? initialState);

// export const selectAllPosts = (state) => state.posts.posts;

// export const getPostStatus = (state) => state.posts.status;

// export const getPostError = (state) => state.posts.error;

// export const getCount = (state) => state.posts.count;

// // export const getPostById = (state, postId) =>
// //   state.posts.posts.find((post) => post.id === postId);

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.userId === userId),
// );
