import { Router } from "express";
import {
    getPosts,
    addPost,
    ratePost,
    getPostById,
    addPostComment,
    getPostComments,
    getRatePostById,
} from "../controllers/posts.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
    createPostCommentSchema,
    createPostSchema,
    createRatePostSchema,
} from "../schemas/post.schema.js";

const router = Router();

router.get("/posts", authRequired, getPosts);
router.post("/post", authRequired, addPost);
router.post("/ratePost", authRequired, ratePost);
router.get("/getRatePost/:postId", authRequired, getRatePostById);
router.post("/postComment", authRequired, addPostComment);
router.get("/post/:id", authRequired, getPostById);
router.get("/postComment/:id", authRequired, getPostComments);

export default router;
