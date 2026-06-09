import React from "react";
import { selectAllPosts } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import { useSelector } from "react-redux";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const Author = users.find((user) => user.id == userId);

  return <span> By {Author ? Author.name : "UnKnown Author"} </span>;
};

export default PostAuthor;
