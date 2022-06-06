const Post = require("../models/Post");

// Get All Posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name")
      .select("content createdAt");

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.json(error);
  }
};

// Create One Post
exports.createOnePost = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const post = await Post.create({ ...req.body, author: userId });

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update One Post
exports.updateOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(
      postId,
      { ...req.body },
      { new: true, runValidator: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete One Post
exports.deleteOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      status: "success",
      message: "Post has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
