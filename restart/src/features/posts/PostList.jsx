import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostStatus,
  getPostError,
  fetchPost,
} from "./postSlice";
import PostExcerpt from "./PostExcerpt";

const postList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]);

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

export default postList;
