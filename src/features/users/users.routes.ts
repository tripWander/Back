import { Router } from 'express';

import UsersController from './users.controller';

const userRouter = Router();

userRouter.get('/', UsersController.getUsers);
userRouter.get('/:userId', UsersController.getUser);
userRouter.delete('/:userId', UsersController.deleteUser);

export default userRouter;
