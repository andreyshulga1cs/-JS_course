import Post from '../dbEntities/Post';
import { AppDataSource } from "../data-source";

const postRepository = AppDataSource.getRepository(Post);

class PostController {

    async createPost(req: any, res: any) {
        const {title, description, image, comments, user} = req.body;

        const post = new Post();

        post.title = title || '';
        post.description = description || '';
        post.thumbnail = image || '';
        post.user = user || '';

        const newPost = await postRepository.save(post);

        res.json(newPost);
    }

    async getPosts(req: any, res: any) {
        const posts = await postRepository.find({
            relations: {
                user: true,
            }
        });
      
        res.json(posts);
    }

    async getPostById(req: any, res: any) {
        const post = await postRepository.findOne({
            where: {
                id: req.params.id,
            },
            relations: {
                user: true,
                comments: true
            },
        });

        if (post) {
            res.json(post);
        } else {
            res.json('');
        }
    }

    async updatePostById(req: any, res: any) {
        const id = req.params.id;
        const {title, description, thumbnail} = req.body;

        const post = await postRepository.findOneBy({
            id: id,
        })
        if (post.title && !title) {
            post.title = post.title;
        } else {
            post.title = title || '';
        }
        if (post.description && !description) {
            post.description = post.description;
        } else {
            post.description = description || '';
        }
        if (post.thumbnail && !thumbnail) {
            post.thumbnail = post.thumbnail;
        } else {
            post.thumbnail = thumbnail || '';
        }

        const updatedPost = await postRepository.save(post)
        res.json(updatedPost)
    }
    
    async deletePostById(req: any, res: any) {
        const id = req.params.id;
        const post = await postRepository.findOneBy({
            id: id,
        })
        await postRepository.remove(post)
        res.json('post was deleted')
    }
}

export default new PostController;