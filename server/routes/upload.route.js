import {Router} from 'express';
import fileMiddleware from '../middleware/file.js';

const uploadRouter = Router();

uploadRouter.post('/upload', fileMiddleware.single('avatar'), (req, res) => {
    try {
        if (req.file) {
            res.json(req.file);
        }
    } catch (error) {
        res.json(error);
    }
})

export default uploadRouter;