import React, { useState, useContext } from "react";
import "../css/Form.css";
import axios from "axios";
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const [postInput, setPostInput] = useState({ content: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      if (!user) navigate("/login");
      const token = localStorage.getItem("token");
      const options = {
        method: "post",
        url: "/api/v1/posts/",
        data: postInput,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(options);
      const { post } = response.data.data;
      const author = { _id: post.author, name: user.userName };
      dispatch({
        type: "CREATE_ONE_POST",
        payload: { ...post, author, isEditable: true },
      });
      setPostInput({ content: "" });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <section className="form-section">
      <form className="form" onSubmit={onSubmitHandle}>
        {errorMessage && (
          <div className="error-message">Error: {errorMessage}</div>
        )}
        <textarea
          type="text"
          name="content"
          className="content"
          placeholder="What's happening?"
          value={postInput.content}
          onChange={(e) => {
            setPostInput({ ...postInput, [e.target.name]: e.target.value });
          }}
        ></textarea>
        <button className="btn" type="submit">
          Tweet
        </button>
      </form>
    </section>
  );
}
