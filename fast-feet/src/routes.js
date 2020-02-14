import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/**
 * Rotas não autenticadas
 */
routes.post('/sessions', SessionController.store);

/**
 * As rotas abaixo passarão pelo middleware de autenticação,
 * portanto o usuário precisa estar autenticado através do token JWT.
 */
routes.use(authMiddleware);

routes.get('/teste', (req, res) => {
  res.status(200).json({ message: 'Autenticado!' });
});

export default routes;
