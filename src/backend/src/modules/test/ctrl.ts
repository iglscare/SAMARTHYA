import { Request, Response } from 'express';
import { ok, fail } from '../../shared/reply';
import { AuthenticatedRequest } from '../../shared/auth';
import {
  getAssessments,
  getAssessment,
  evaluateAssessment,
  getLatestReport,
} from './service';

export async function getAssessmentsList(_req: Request, res: Response): Promise<void> {
  try {
    const list = await getAssessments();
    ok(res, list, 'Available assessments list retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch assessments', 500);
  }
}

export async function getAssessmentById(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const test = await getAssessment(id);
    if (!test) {
      fail(res, 'Assessment not found', 404);
      return;
    }
    ok(res, test, 'Assessment questions retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch assessment', 500);
  }
}

export async function submitAssessment(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const userId = req.user?.userId || req.body.userId || 'usr-default-officer';
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      fail(res, 'Assessment answers object is required', 400);
      return;
    }

    const evaluation = await evaluateAssessment(id, userId, answers);
    ok(res, evaluation, 'Assessment graded successfully. Competencies and roadmap updated.');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to evaluate assessment', 500);
  }
}

export async function getDiagnosticReport(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const id = req.params.id ? String(req.params.id) : undefined;
    const userId = req.user?.userId || (req.query.userId as string) || 'usr-default-officer';
    const report = await getLatestReport(userId, id);
    if (!report) {
      fail(res, 'No previous submission found for this assessment', 404);
      return;
    }
    ok(res, report, 'Diagnostic assessment report retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch diagnostic report', 500);
  }
}
