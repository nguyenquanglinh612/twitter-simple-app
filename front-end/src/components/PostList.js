import React, { useEffect, useCallback, useContext } from "react";
import PostItem from "./PostItem";
import "../css/Post.css";
import axios from "axios";
import AppContext from "./AppContext";

export default function PostList() {
  const { state, dispatch } = useContext(AppContext);
  const { posts, user } = state;
  const getAllPosts = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "/api/v1/posts",
      };
      const response = await axios(options);
      const posts = response.data.data.posts;
      dispatch({ type: "GET_ALL_POSTS", payload: posts });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const newPosts = posts
    .map((post) => {
      const isEditable = user && post.author.name === user.userName;
      return { ...post, isEditable };
    })
    .reverse();

  return (
    <section className="post-section">
      <div className="post-list">
        {newPosts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </section>
  );
}
