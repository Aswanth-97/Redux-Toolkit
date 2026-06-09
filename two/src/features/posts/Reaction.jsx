import React from "react";
import { useDispatch } from "react-redux";
import { reactionsAdded } from "./postSlice";

const reactionEmoji = {
  thumbsup: "👍",
  wow: "😄",
  rocket: "🚀",
  hart: "💖",
  coffee: "☕",
};

const Reaction = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      className="reactionButton"
      onClick={() => {
        dispatch(reactionsAdded({ postId: post.id, reaction: name }));
      }}
    >
      {emoji}
      {post.reactions[name]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
};

export default Reaction;
