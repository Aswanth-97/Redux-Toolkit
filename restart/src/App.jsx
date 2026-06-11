import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import postList from "./features/posts/PostList";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditForm from "./features/posts/EditForm";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
