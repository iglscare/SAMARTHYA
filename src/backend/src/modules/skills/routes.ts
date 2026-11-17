import { Router } from 'express';
import {
  getCompetencies,
  getUserSkillsSummary,
  updateSkillRating,
} from './ctrl';
import { authenticateToken } from '../../shared/auth';

const router = Router();

router.get('/', getCompetencies);
router.get('/summary', authenticateToken as any, getUserSkillsSummary as any);
router.put('/rating', authenticateToken as any, updateSkillRating as any);

export default router;

