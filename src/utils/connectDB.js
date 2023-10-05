const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected Successfully"))
    .catch((err) => console.error(err));
};

module.exports = connectDB;
