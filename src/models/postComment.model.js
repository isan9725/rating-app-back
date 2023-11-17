import mongoose from "mongoose";

const postCommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

export default mongoose.model("PostComment", postCommentSchema);
