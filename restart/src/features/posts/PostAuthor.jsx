import React from "react";
import { useSelector } from "react-redux";
import { selectAllUers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUers);

  const Author = users.find((user) => user.id == userId);

  return <span>{Author ? Author.name : "Unknown Author"}</span>;
};

export default PostAuthor;
