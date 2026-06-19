import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import {  userApiSlice } from "./features/users/usersSlice.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { fetchPost } from "./features/posts/postSlice.js";
import { exendedApiSlice } from "./features/posts/postSlice.js";

store.dispatch(userApiSlice.endpoints.getUsers.initiate());
store.dispatch(exendedApiSlice.endpoints.getPosts.initiate());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
