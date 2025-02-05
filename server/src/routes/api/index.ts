import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { recipeRouter } from './recipes-route.js';

const router = Router();

router.use('/users', userRouter);
router.use('/recipe', recipeRouter)

export default router;
