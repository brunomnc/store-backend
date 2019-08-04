import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);

export default routes;
