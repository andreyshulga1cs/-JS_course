import User from '../dbEntities/User';
import Post from '../dbEntities/Post';
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);

class PostController {

    async createPost(req: any, res: any) {
        const {title, description, image, user} = req.body;

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
                likes: true
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
        const {title, description, image} = req.body;

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
        if (post.thumbnail && !image) {
            post.thumbnail = post.thumbnail;
        } else {
            post.thumbnail = image || '';
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

    async toggleLike(req: any, res: any) {
        const postId = req.params.id;
        const {userEmail} = req.body;

        const post = await postRepository.findOne({
            where: {
                id: postId,
            },
            relations: {
                likes: true,
            },
        });
        const user = await userRepository.findOne({
            where: {
                email: userEmail,
            },
        });

        if (post.likes.some(user => user.email === userEmail)) {
            post.likes = post.likes.filter(user => user.email !== userEmail);
        } else {
            post.likes.push(user);
        }

        const updatedPost = await postRepository.save(post)
        res.json(post.likes)
    }
    async getCountLikes(req: any, res: any) {
        const post = await postRepository.findOne({
            where: {
                id: req.params.id,
            },
            relations: {
                likes: true
            },
        });

        res.json(post.likes.length);
    }
}

export default new PostController;