const express = require("express");

const {
  login,
  register,
  getCurrentUser,
} = require("../controllers/authController");
const { checkCurrentUsers } = require("../middlewares/checkCurrentUser");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/").get(checkCurrentUsers, getCurrentUser);

module.exports = Router;
