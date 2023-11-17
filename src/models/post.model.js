import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    usersRateCount: {
        type: Number,
        required: true,
    },
    totalStars: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Post", postSchema);
