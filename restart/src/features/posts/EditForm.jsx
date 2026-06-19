import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "./postSlice";
// import { selectAllUers } from "../users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdatePostMutation, useDeletePostMutation } from "./postSlice";
import { useGetUsersQuery } from "../users/usersSlice";

const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  // const users = useSelector(selectAllUers);

  const { data: users, isSuccess } = useGetUsersQuery();

  const { postId } = useParams();

  const post = useSelector((state) => getPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  // const [addReqstatus, setAddreqStatus] = useState("idle");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onUserChange = (e) => setUserId(Number(e.target.value));

  if (!post) {
    return (
      <section>
        <p>Post Not Found</p>
      </section>
    );
  }

  const canSave =
    Boolean(title) && Boolean(content) && Boolean(userId) && !isLoading;
  // addReqstatus == "idle";

  let userOptions;

  if (isSuccess) {
    userOptions = users.ids.map((id) => (
      <option value={id} key={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  const onSubmitpost = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap();
        setContent("");
        setTitle("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("filed to save the post", error);
      }
    }
  };

  const onDeletepost = async () => {
    try {
      // setAddreqStatus("pending");
      // dispatch(deletePost({ id: post.id })).unwrap();
      await deletePost({ id: post.id }).unwrap();

      setContent("");
      setTitle("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error("failed to delete the post", error);
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
          Save
        </button>
        <button type="button" onClick={onDeletepost} className="deleteButton">
          Delete
        </button>
      </form>
    </section>
  );
};

export default EditForm;
