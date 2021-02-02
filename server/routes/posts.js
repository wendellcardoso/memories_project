import express from 'express';
import { getPosts, createPost } from '../controllers/postsController.js';

const router = express.Router();

router.route("/")
    .get(getPosts)
    .post(createPost);

export default router;