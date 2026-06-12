import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";
import "./App.css";
import { Routes, Route, Navigate, replace } from "react-router-dom";
import Layout from "./components/Layout";
import postList from "./features/posts/PostList";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditForm from "./features/posts/EditForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditForm />} />
          </Route>
          <Route path="user">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>

          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
