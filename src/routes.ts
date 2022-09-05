import UsersRoutes from '@src/features/users/users.routes';
import AuthRoutes from './features/auth/auth.routes';

export default {
  '/auth': AuthRoutes,
  '/users': UsersRoutes,
};
