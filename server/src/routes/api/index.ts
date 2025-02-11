import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { recipeRouter } from './recipes-route.js';
import { nutritionRouter } from './usda-lookup.js';
import { feedbackRecipe } from './feedbackRecipe-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/recipe', recipeRouter);
router.use('/nutrition', nutritionRouter);
router.use('/history', feedbackRecipe);

export default router;