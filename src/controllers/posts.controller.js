import Post from "../models/post.model.js";
import RatePost from "../models/ratePost.model.js";
import PostComment from "../models/postComment.model.js";
import { calculateRate } from "../libs/helper.js";

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
};

export const addPost = async (req, res) => {
    const { title, description, urlImage } = req.body;

    try {
        const newPost = new Post({
            user: req.user.id,
            title,
            description,
            imageLink: urlImage,
            usersRateCount: 0,
            totalStars: 0,
            rate: 0,
        });

        await newPost.save();

        res.status(201).json({
            message: "Post create succesfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const ratePost = async (req, res) => {
    const { postId, rate } = req.body;

    try {
        const isUserRateThisPost = await RatePost.exists({ post: postId, user: req.user.id });

        if (isUserRateThisPost)
            return res.status(400).json({ message: "you already rate this post" });

        let postById = await Post.findById(postId);

        const updateUsersRate = postById.usersRateCount + 1;
        const updateTotalStars = postById.totalStars + rate;

        postById.usersRateCount = updateUsersRate;
        postById.totalStars = updateTotalStars;

        const averageStars = await calculateRate(updateTotalStars, updateUsersRate);

        postById.rate = averageStars;

        await postById.save();

        const newRatePost = new RatePost({
            user: req.user.id,
            post: postId,
            rateStars: rate,
        });

        await newRatePost.save();

        res.status(201).json({ message: "rate succesfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRatePostById = async (req, res) => {
    try {
        const rateByid = await RatePost.findOne({ user: req.user.id, post: req.params.postId });

        if (!rateByid) return res.status(200).json({ isRate: false, rate: 0 });

        res.status(200).json({ rate: rateByid.rateStars, isRate: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addPostComment = async (req, res) => {
    const { comment, postId } = req.body;

    try {
        const newPostComment = new PostComment({
            user: req.user.id,
            post: postId,
            comment: comment,
        });

        await newPostComment.save();

        res.status(201).json({
            message: "comment made succesfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostComments = async (req, res) => {
    try {
        const allPostsCommentsWithPostId = await PostComment.find({ post: req.params.id });

        res.status(200).json(allPostsCommentsWithPostId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const postById = await Post.findById(req.params.id);
        const postComments = await PostComment.find({ post: req.params.id });

        if (!postById) return res.status(404).json();

        res.status(200).json({ post: postById, comments: postComments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
