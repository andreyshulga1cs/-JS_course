import {Router} from 'express';
import userController from '../controller/user.controller.js';

const userRouter = Router();

userRouter.post('/user', userController.createUser);
userRouter.get('/user', userController.getUsers);
// userRouter.get('/user/:id', userController.getUser);
userRouter.get('/user/email/:email', userController.getUserByEmail);
// userRouter.put('/user/:id', userController.updateUser);
userRouter.put('/user/email/:email', userController.updateUserByEmail);
// userRouter.delete('/user/:id', userController.deleteUser);
userRouter.delete('/user/email/:email', userController.deleteUserByEmail);

export default userRouter;