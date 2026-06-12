import React from "react";
import { selectUserById } from "./usersSlice";
import { selectAllPosts } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsbyUser = useSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.userId === Number(userId));
  });

  const postTitles = postsbyUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  )
};

export default UserPage;
