require("dotenv").config();

// Connect DB
const { connectDB } = require("./configs/db");
connectDB();

const express = require("express");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

const { errorHandler } = require("./middlewares/errorHandler");

const cors = require("cors");

const app = express();

// Cors
app.use(cors());

// BodyParser
app.use(express.json());

// Mount Route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);

app.all("*", (req, res, next) => {
  const err = new Error("The route can not be found");
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
