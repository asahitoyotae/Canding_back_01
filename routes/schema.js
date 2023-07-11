const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    max: 100,
  },
  report: {
    type: String,
  },
  dateSend: {
    type: String,
  },
});

module.exports = mongoose.model("Message", schema);
