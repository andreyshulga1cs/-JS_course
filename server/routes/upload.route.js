import {Router} from 'express';
import fileMiddleware from '../middleware/file.js';

const router = Router();

router.post('/upload', fileMiddleware.single('avatar'), (req, res) => {
    try {
        if (req.file) {
            res.json(req.file);
        }
    } catch (error) {
        console.log(error);
    }
})

export default router;