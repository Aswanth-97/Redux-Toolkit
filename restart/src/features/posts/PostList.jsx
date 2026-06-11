import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts, getPostStatus, getPostError } from "./postSlice";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  let content;
  if (postStatus == "loading") {
    content = <p>Loading....</p>;
  } else if (postStatus == "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ));
  } else if (postStatus == "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostList;
