import React from "react";
import { useSelector } from "react-redux";
import { selectPostIds } from "./postSlice";
import PostExcerpt from "./PostExcerpt";
import { useGetPostsQuery } from "./postSlice";

const PostList = () => {
  const { isLoading, isError, isSuccess, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);
  // const postStatus = useSelector(getPostStatus);
  // const error = useSelector(getPostError);

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    // content = orderedPosts.map((post) => (
    //   <PostExcerpt post={post} key={post.id} />
    // ));

    content = orderedPostIds.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostList;
