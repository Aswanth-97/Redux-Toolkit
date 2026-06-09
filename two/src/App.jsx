import { useState } from "react";
import PostLists from "./features/posts/PostLists";
import "./App.css";
import AddpostForm from "./features/posts/AddpostForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="app">
        <AddpostForm />
        <PostLists />
      </main>
    </>
  );
}

export default App;
