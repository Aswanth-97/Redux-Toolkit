import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import TodoList from "./features/todo/TodoList";

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
