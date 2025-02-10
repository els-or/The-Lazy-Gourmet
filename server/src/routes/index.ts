import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
//Authenticated routes disabled until authentication is implemented
router.use('/api', authenticateToken, apiRoutes);
router.use('/api', apiRoutes);

export default router;
