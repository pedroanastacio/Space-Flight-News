import { Router } from 'express'
import { ArticleController } from '../controllers/ArticleController';
import { DefaultController } from '../controllers/DefaultController';

export const routes = Router();

const defaultController = new DefaultController()
const articleController = new ArticleController()

routes.get('/', defaultController.handle)
routes.get('/articles', articleController.find)
routes.get('/articles/:id', articleController.findOne)