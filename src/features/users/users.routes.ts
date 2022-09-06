import { Router } from 'express';

import UsersController from './users.controller';

const userRouter = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     description: get list of users!
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Returns list of users.
 */
userRouter.get('/', UsersController.getUsers);

/**
 * @openapi
 * /users/:userId:
 *   get:
 *     description: get user by userId
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Returns user.
 */
userRouter.get('/:userId', UsersController.getUser);

/**
 * @openapi
 * /users/:userId:
 *   delete:
 *     description: delete a user!
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: will delete user by id.
 */
userRouter.delete('/:userId', UsersController.deleteUser);

export default userRouter;
