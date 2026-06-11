import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const ReactionButton = ({ post }) => {
  const reactionEmoji = {
    thumbsup: "👍",
    wow: "😱",
    hart: "❤️",
  };
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reaction: name }));
        }}
      >
        {emoji} {post.reactions?.[name]??0}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
