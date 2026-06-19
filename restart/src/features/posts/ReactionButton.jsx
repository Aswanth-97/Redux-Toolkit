import React from "react";
import { useAddReactionMutation } from "./postSlice";
// import { useDispatch } from "react-redux";
// import { reactionAdded } from "./postSlice";

const ReactionButton = ({ post }) => {
  const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😱",
    heart: "❤️",
    rocket: "❤️",
    coffee: "❤️",
  };

  // const dispatch = useDispatch();
  const [addReactions] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          const newValue = post.reactions[name] + 1;
          // dispatch(reactionAdded({ postId: post.id, reaction: name }));
          addReactions({
            postId: post.id,
            reactions: { ...post.reactions, [name]: newValue },
          });
        }}
      >
        {emoji} {post.reactions?.[name] ?? 0}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
