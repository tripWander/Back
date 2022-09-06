import { Router } from 'express';

import AuthController from './auth.controller';

const authRouter = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: login a user!
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: viktor@gmail.com
 *               password: Hard1Pass2!
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: Returns accessToken and user id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 accessToken: longtoken
 *                 id: longid
 */
authRouter.post('/login', AuthController.login);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     description: register new user!
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: return user.
 */
authRouter.post('/register', AuthController.register);

export default authRouter;
