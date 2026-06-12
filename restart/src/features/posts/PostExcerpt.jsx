import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostById } from "./postSlice";

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => getPostById(state, postId));
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`/post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default PostExcerpt;
