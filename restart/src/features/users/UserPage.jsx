import React from "react";
// import { selectUserById } from "./usersSlice";
// import { selectAllPosts, selectPostsByUser } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostsByUserIdQuery } from "../posts/postSlice";
import { useGetUsersQuery } from "./usersSlice";

const UserPage = () => {
  const { userId } = useParams();

  // const user = useSelector((state) => selectUserById(state, Number(userId)));

  // const postsbyUser = useSelector(state=>selectPostsByUser(state,Number(userId)))


    const { user,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
        isError: isErrorUser,
        error: errorUser
    } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            user: data?.entities[userId],
            isLoading,
            isSuccess,
            isError,
            error
        }),
    })

  const {
    data: postsbyUser,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetPostsByUserIdQuery(Number(userId));

  let content;
  if (isLoading) {
    content = <p>loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsbyUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  // const postTitles = postsbyUser.map((post) => (
  //   <li key={post.id}>
  //     <Link to={`/post/${post.id}`}>{post.title}</Link>
  //   </li>
  // ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
