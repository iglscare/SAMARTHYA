import { Router } from 'express';
import { authenticateToken, requireRole } from '../../shared/auth';
import {
  getDeptDashboard,
  getRoster,
  getOfficer,
  runSimulator,
} from './ctrl';

const router = Router();

// Department HR routes - accessible by department HR officers and admins
router.use(authenticateToken);

router.get('/dashboard', requireRole(['department', 'admin']), getDeptDashboard);
router.get('/roster', requireRole(['department', 'admin']), getRoster);
router.get('/officer/:id', requireRole(['department', 'admin', 'learner']), getOfficer);
router.post('/simulator', requireRole(['department', 'admin']), runSimulator);

export default router;
