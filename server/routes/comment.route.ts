import {Router} from 'express';
import commentController from '../controller/comment.controller';

const commentRouter = Router();

commentRouter.post('/comment', commentController.createComment);

export default commentRouter;