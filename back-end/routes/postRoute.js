const express = require("express");

const Router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  getAllPosts,
  createOnePost,
  updateOnePost,
  deleteOnePost,
} = require("../controllers/postController.js");

Router.route("/").get(getAllPosts).post(verifyToken, createOnePost);

Router.route("/:postId")
  .put(verifyToken, updateOnePost)
  .delete(verifyToken, deleteOnePost);

module.exports = Router;
