import { Request, Response } from 'express';

import { BaseError } from "@/utils/errors";
import { UsersQuery } from './users.dto';
import UsersService from './users.service';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { page, limit, age, email } = req.query;
  const convertedPage = Number(page);
  const convertedLimit = Number(limit);
  if (isNaN(convertedLimit) || isNaN(convertedPage)) {
    res.status(400).send('No page or limit were provided in the request');
  }
  const usersQuery = new UsersQuery(convertedPage, convertedLimit, String(age), String(email));
  const result = await UsersService.getUsers(usersQuery);
  if (result instanceof BaseError) {
    res.status(result.statusCode).send(result.message);
    return;
  }
  res.send(result);
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const result = await UsersService.getUser(userId);
  if (result instanceof BaseError) {
    res.status(result.statusCode).send(result.message);
    return;
  }
  res.send(result);
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const result = await UsersService.deleteUser(userId);
  if (result instanceof BaseError) {
    res.status(result.statusCode).send(result.message);
    return;
  }
  res.send(result);
};

export default {
  getUsers,
  getUser,
  deleteUser,
};
