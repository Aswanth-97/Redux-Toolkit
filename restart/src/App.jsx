import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";
import "./App.css";

function App() {
  return (
    <>
      <section id="center">
        <AddPostForm />
        <PostList />
      </section>
    </>
  );
}

export default App;
