import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPostById, updatePost } from "./postSlice";
import { selectAllUers } from "../users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();

  const post = useSelector((state) => getPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [addReqstatus, setAddreqStatus] = useState("idle");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onUserChange = (e) => setUserId(e.target.value);

  if (!post) {
    return (
      <section>
        <p>Post Not Found</p>
      </section>
    );
  }

  const users = useSelector(selectAllUers);

  const canSave =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    addReqstatus == "idle";

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  const onSubmitpost = () => {
    if (canSave) {
      try {
        setAddreqStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          }),
        ).unwrap();
        setContent("");
        setTitle("");
        setUserId("");
        navigate(`/post/${postId}`);
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
        <select defaultValue={userId} id="AuthorName" onChange={onUserChange}>
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

export default EditForm;
