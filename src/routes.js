import { Router } from 'express';
import multer from 'multer';
import configMulter from './config/multer';

import UserController from './app/controllers/UserController';
import SessionControler from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import FileController from './app/controllers/FileController';
import VideoController from './app/controllers/VideoController';
import VideoUserController from './app/controllers/VideoUserController';
import CommentController from './app/controllers/CommentController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(configMulter);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionControler.store);

routes.get('/videos', VideoController.index);
routes.get('/videos/:id', VideoController.show);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/myvideos', VideoUserController.index);
routes.post('/videos', VideoController.store);
routes.put('/videos/:id', VideoController.update);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/comments/:id', CommentController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
