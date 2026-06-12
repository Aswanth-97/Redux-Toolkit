import React from "react";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsbyUser = useSelector(state=>selectPostsByUser(state,Number(userId)))

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
