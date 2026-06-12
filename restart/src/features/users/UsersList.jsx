import React from "react";
import { selectAllUers } from "./usersSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUers);

  const renderdPosts = users.map((user) => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderdPosts}</ul>
    </section>
  );
};

export default UsersList;
