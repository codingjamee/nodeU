const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: string,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      //게시물을 참조할 것이기 때문에
      //ref키에 Post모델을 추가
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
