import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  student: {
    type: String,
    required: true,
  },
  comments: [{
    comment: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      required: true,
    }
  }],
  likes: [
    {
      student: {
        type: String,
        required: true,
      }
    }
  ]
})

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);