require('dotenv').config()
const cookieParser = require('cookie-parser');
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require('./utils/connectDB');

// route imports
const authRouter = require("./routes/auth")
const usersRouter = require("./routes/users")
const hotelsRouter = require("./routes/hotels")
const roomsRouter = require("./routes/rooms");
// middlewares


app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/hotels", hotelsRouter)
app.use("/api/v1/rooms", roomsRouter)

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';
  res.status(statusCode).json({ errorMessage });
})

app.listen(3000, function () {
  connectDB()
  console.log("Express Started on Port 3000");
});
