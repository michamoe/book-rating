import express from 'express';
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/posts.js';

const postRouter = express.Router();

postRouter.route('/').get(getAllPosts).post(createPost);

postRouter.route('/:id').get(getPost).put(updatePost).delete(deletePost);

export default postRouter;
