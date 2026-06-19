import React from "react";
// import { useSelector } from "react-redux";
// import { selectAllUers } from "../users/usersSlice";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  // const users = useSelector(selectAllUers);

  // const Author = users.find((user) => user.id == userId);

  //  const { data, isLoading, isError, isSuccess, error } = useGetUsersQuery()

  // const Author =data?.entities[userId]

  const { user: Author } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <span>
      {Author ? (
        <Link to={`/user/${userId}`}>{Author.name}</Link>
      ) : (
        "Unknown Author"
      )}
    </span>
  );
};

export default PostAuthor;
