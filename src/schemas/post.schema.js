import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    urlImage: z.string({
        required_error: "UrlImage is required",
    }),
});

export const createRatePostSchema = z.object({
    postId: z.number({
        required_error: "Post Id is required",
    }),
    rate: z.number({
        required_error: "Rate is required",
    }),
});

export const createPostCommentSchema = z.object({
    comment: z.string({
        required_error: "Comment is required",
    }),
    postId: z.number({
        required_error: "Post id is required",
    }),
});
