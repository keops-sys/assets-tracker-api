const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  assetname: {
    type: String
  }
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;