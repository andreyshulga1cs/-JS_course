import {Router} from 'express';
import userController from '../controller/user.controller';

const userRouter = Router();

userRouter.post('/user', userController.createUser);
userRouter.get('/user', userController.getUsers);
userRouter.get('/user/email/:email', userController.getUserByEmail);
userRouter.put('/user/email/:email', userController.updateUserByEmail);
userRouter.delete('/user/email/:email', userController.deleteUserByEmail);

export default userRouter;