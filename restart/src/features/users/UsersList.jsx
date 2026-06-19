import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./usersSlice";

const UsersList = () => {
  const { data:users, isSuccess } = useGetUsersQuery("getUsers");

  let renderdPosts;
  if (isSuccess) {
    renderdPosts = users.ids.map((id) => (
      <li key={id}>
        <Link to={`/user/${id}`}>{users.entities[id].name}</Link>
      </li>
    ));
  }

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderdPosts}</ul>
    </section>
  );
};

export default UsersList;
