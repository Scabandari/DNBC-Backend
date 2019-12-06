const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  probStatement: {
    // S3 resource url
    type: String,
    default: ""
  },
  report: {
    // S3 resource url
    type: String,
    default: ""
  },
  repositories: [
    {
      url: String,
      name: String
    }
  ],
  chips: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("Project", projectSchema);
