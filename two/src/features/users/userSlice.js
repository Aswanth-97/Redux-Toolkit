import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 0, name: "aswanth" },
  { id: 1, name: "aswanth2" },
  { id: 2, name: "aswanth3" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;
