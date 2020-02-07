const mongoose = require("mongoose");

const User = require("./Asset.model");

const connection = "mongodb://localhost:27017/assetsTracker"

const connectDb = () => {
  return mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true});
};


module.exports = connectDb;