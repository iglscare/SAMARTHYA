import { Router } from 'express';
import {
  getRoadmap,
  getRoadmapVersions,
  recalculateRoadmap,
} from './ctrl';
import { authenticateToken } from '../../shared/auth';

const router = Router();

router.get('/', authenticateToken as any, getRoadmap as any);
router.get('/versions', authenticateToken as any, getRoadmapVersions as any);
router.post('/recalculate', authenticateToken as any, recalculateRoadmap as any);

export default router;

