import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { recipeRouter } from './recipes-route.js';
// import { feedbackRecipe } from './feedbackRecipe-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/recipe', recipeRouter);
// router.use('/recipe', feedbackRecipe);

export default router;