import AuthRoutes from '@/features/auth/auth.routes';
import SwaggerRoutes from "@/features/swagger/swagger.routes";
import UsersRoutes from '@/features/users/users.routes';

export default {
  '/auth': AuthRoutes,
  '/users': UsersRoutes,
  '/api-docs': SwaggerRoutes
};
