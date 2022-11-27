import {Router} from 'express';
import postController from '../controller/post.controller';

const postRouter = Router();

postRouter.post('/post', postController.createPost);
postRouter.get('/post', postController.getPosts);
postRouter.get('/post/id/:id', postController.getPostById);
postRouter.put('/post/id/:id', postController.updatePostById);
postRouter.delete('/post/id/:id', postController.deletePostById);
postRouter.post('/like/id/:id', postController.toggleLike);
postRouter.get('/like/id/:id', postController.getCountLikes);

export default postRouter;