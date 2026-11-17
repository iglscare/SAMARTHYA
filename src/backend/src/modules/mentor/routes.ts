import { Router } from 'express';
import { authenticateToken } from '../../shared/auth';
import { chatHandler, promptsHandler } from './ctrl';

const router = Router();

// Mentor endpoints require authentication
router.use(authenticateToken);

router.post('/chat', chatHandler);
router.get('/prompts', promptsHandler);

export default router;
