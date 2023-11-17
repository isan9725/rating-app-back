import mongoose from "mongoose";

const ratePostSchema = new mongoose.Schema({
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
    rateStars: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("RatePost", ratePostSchema);
