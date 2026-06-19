import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addPost } from "./postSlice";
import {  useGetUsersQuery } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postSlice";

const addPostForm = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  // const [addReqstatus, setAddreqStatus] = useState("idle");

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const { data: users, isSuccess } = useGetUsersQuery("getUsers");

  let userOptions;

  if (isSuccess) {
    const userOptions = users.ids.map((id) => (
      <option value={id} key={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onUserChange = (e) => setUserId(e.target.value);

  // const users = useSelector(selectAllUers);

  const canSave =
    Boolean(title) && Boolean(content) && Boolean(userId) && !isLoading;
  // && addReqstatus == "idle";

  const onSubmitpost = async () => {
    if (canSave) {
      try {
        // setAddreqStatus("pending");
        // dispatch(addPost({ title, body: content, userId })).unwrap();
        await addNewPost({ title, body: content, userId }).unwrap();

        setContent("");
        setTitle("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("filed to save the post", error);
      } finally {
        setAddreqStatus("idle");
      }
    }
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

        <label htmlFor="AuthorName">Author</label>
        <select value={userId} id="AuthorName" onChange={onUserChange}>
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor="PostContent">Post Content</label>
        <textarea
          name="content"
          id="PostContent"
          value={content}
          onChange={onContentChange}
        ></textarea>
        <button type="button" onClick={onSubmitpost} disabled={!canSave}>
          SUBMIT
        </button>
      </form>
    </section>
  );
};

export default addPostForm;
