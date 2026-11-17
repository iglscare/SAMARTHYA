import { Router } from 'express';
import {
  getAssessmentsList,
  getAssessmentById,
  submitAssessment,
  getDiagnosticReport,
} from './ctrl';
import { authenticateToken } from '../../shared/auth';

const router = Router();

router.get('/', getAssessmentsList);
router.get('/:id', getAssessmentById);
router.post('/:id/submit', authenticateToken as any, submitAssessment as any);
router.get('/:id/report', authenticateToken as any, getDiagnosticReport as any);

export default router;
