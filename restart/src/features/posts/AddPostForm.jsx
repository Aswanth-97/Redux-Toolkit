import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postSlice";
import { nanoid } from "@reduxjs/toolkit";

const addPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [userId, setUserId] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  // const onUserChange = (e) => setUserId(e.target.value);

  const onSubmitpost = () => {
    if (title && content) {
      dispatch(postAdded({ id: nanoid(), title, content }));
    }
    setContent("");
    setTitle("");
  };

  return (
    <section>
      <h2>Add Post</h2>
      <form action="">
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        {/* <label htmlFor="AuthorName">Author</label>
        <select value={userId} id="AuthorName" onChange={onUserChange}>
          <option value=""></option>
          {userOptions}
        </select> */}

        <label htmlFor="PostContent">Post Content</label>
        <textarea
          name="content"
          id="PostContent"
          value={content}
          onChange={onContentChange}
        ></textarea>
        <button type="button" onClick={onSubmitpost}>
          SUBMIT
        </button>
      </form>
    </section>
  );
};

export default addPostForm;
