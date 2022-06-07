import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "./AppContext";

export default function PostItem({ post }) {
  const { dispatch } = useContext(AppContext);
  const [postToEdit, setPostToEdit] = useState(post);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const date = new Date(post.createdAt);

  const updatePost = async () => {
    try {
      setIsEdit(false);
      const token = localStorage.getItem("token");
      const options = {
        method: "put",
        url: `/api/v1/posts/${post._id}`,
        data: postToEdit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(options);
      dispatch({ type: "UPDATE_ONE_POST", payload: { ...postToEdit } });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      setIsEdit(false);
      const token = localStorage.getItem("token");
      const options = {
        method: "delete",
        url: `/api/v1/posts/${post._id}`,
        data: postToEdit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(options);
      dispatch({ type: "DELETE_ONE_POST", payload: { _id: post._id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-item">
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <div className="post-info">
          <span>by {post.author.name}</span>
          <span>
            Date:{" "}
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </span>
        </div>
        {post.isEditable && (
          <div className="post-edit-delete">
            {isDelete ? (
              <>
                <span className="delete-question">Are you sure?</span>
                <span onClick={deletePost}>Yes</span>
                <span onClick={() => setIsDelete(false)}>No</span>
              </>
            ) : (
              <>
                <span onClick={() => setIsEdit(true)}>Edit</span>
                <span onClick={() => setIsDelete(true)}>Delete</span>
              </>
            )}
          </div>
        )}
      </div>

      {isEdit && (
        <div className="post-edit-form">
          <form className="edit-form">
            <textarea
              type="text"
              name="content"
              className="content"
              placeholder="What's happening?"
              value={postToEdit.content}
              onChange={(e) => {
                setPostToEdit({ ...postToEdit, content: e.target.value });
              }}
            ></textarea>
            <div className="btn-container">
              <button
                className="btn btn-update"
                type="button"
                onClick={updatePost}
              >
                Update
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
