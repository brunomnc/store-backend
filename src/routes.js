import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
// import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use(cors({ origin: 'http://localhost:3000' }));

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.get('/users', UserController.index);

routes.post('/session', SessionController.store);

// routes.use(authMiddleware);

routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);
routes.get('/products', ProductController.index);

export default routes;
