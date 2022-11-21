import Comment from '../dbEntities/Comment';
import { AppDataSource } from "../data-source";

const commentRepository = AppDataSource.getRepository(Comment);

class CommentController {

    async createComment(req: any, res: any) {
        const {post, content, userEmail} = req.body;

        const comment = new Comment();

        comment.post = post || '';
        comment.content = content || '';
        comment.userEmail = userEmail || '';

        const newComment = await commentRepository.save(comment);

        res.json(newComment);
    }
}

export default new CommentController;