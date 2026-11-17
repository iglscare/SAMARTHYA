import { Router } from 'express';
import {
  getCoursesList,
  getCourseById,
  updateProgress,
  submitFeedback,
} from './ctrl';
import { authenticateToken } from '../../shared/auth';

const router = Router();

router.get('/', getCoursesList);
router.get('/:id', getCourseById);
router.post('/:id/progress', authenticateToken as any, updateProgress as any);
router.post('/:id/feedback', authenticateToken as any, submitFeedback as any);

export default router;
