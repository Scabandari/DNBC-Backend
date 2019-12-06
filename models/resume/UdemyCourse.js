const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const udemyCourseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Course title is required"]
  },
  author: {
    type: String,
    required: [true, "Course author is required"]
  },
  link: {
    type: String,
    required: [true, "A link to the course is required"]
  },
  purchased: {
    type: Boolean,
    required: [true, "Whether or not the course has been completed is required"]
  },
  started: {
    type: Boolean,
    required: [true, "Whether or not the course has been completed is required"]
  },
  completed: {
    type: Boolean,
    required: [true, "Whether or not the course has been completed is required"]
  },
  review: {
    type: String,
    required: [true, "A course review is required"]
  },
  imgUrl: {
    // S3 resource url
    type: String
  },
  rating: {
    type: Number,
    validate: {
      validator: function(r) {
        return r >= 0 && r <= 5;
      },
      message: "Rating should be a number between 0 and 5."
    },
    required: [true, "A course rating is required"]
  }
});

module.exports = mongoose.model("UdemyCourse", udemyCourseSchema);
