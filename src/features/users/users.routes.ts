import passport from "passport";
import { Router } from "express";

import UsersController from "./users.controller";
import {passportBaseJWT} from "@/middlewares/auth.middlewares";

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
userRouter.get("/", passportBaseJWT, UsersController.getUsers);

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
userRouter.get("/:userId", passportBaseJWT, UsersController.getUser);

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
userRouter.delete("/:userId", passport.authenticate("jwt", { session: false }), UsersController.deleteUser);

export default userRouter;
