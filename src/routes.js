import { Router } from 'express';

const routes = new Router();

routes.get('/users', (req, res) => res.send());

export default routes;
