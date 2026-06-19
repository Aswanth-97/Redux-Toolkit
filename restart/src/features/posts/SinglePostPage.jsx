import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { getPostById } from "./postSlice";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => getPostById(state, Number(postId)));


//   const allPosts = useSelector(state => state.posts.post);

// console.log(
//   allPosts.filter(p => p.id === Number(postId))
// );

  if (!post) {
    return (
      <article>
        <p>Post Not Found.</p>
      </article>
    );
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default SinglePostPage;
