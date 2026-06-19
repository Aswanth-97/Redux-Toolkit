import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

// const users_url = "https://jsonplaceholder.typicode.com/users";

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   try {
//     const response = await axios.get(users_url);

//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// });

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       return action.payload;
//     });
//   },
// });

// export default usersSlice.reducer;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "user", id: "LIST" },
        ...result.ids.map((id) => ({ type:"user", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;

// export const selectAllUers = (state) => state.users;

// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);
