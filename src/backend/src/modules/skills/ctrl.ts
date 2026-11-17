import { Request, Response } from 'express';
import { ok, fail } from '../../shared/reply';
import { AuthenticatedRequest } from '../../shared/auth';
import {
  getAllCompetencies,
  calculateUserSkillsSummary,
  updateUserRating,
} from './service';

export async function getCompetencies(_req: Request, res: Response): Promise<void> {
  try {
    const list = await getAllCompetencies();
    ok(res, list, 'Competency framework retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch competencies', 500);
  }
}

export async function getUserSkillsSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || (req.query.userId as string) || 'usr-default-officer';
    const summary = await calculateUserSkillsSummary(userId);
    ok(res, summary, 'User skill gaps and readiness score computed');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to calculate skills summary', 500);
  }
}

export async function updateSkillRating(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { competencyId, currentLevel, verifiedLevel } = req.body;

    if (!userId || !competencyId || currentLevel === undefined) {
      fail(res, 'userId, competencyId, and currentLevel are required', 400);
      return;
    }

    await updateUserRating(userId, competencyId, Number(currentLevel), verifiedLevel ? Number(verifiedLevel) : undefined);
    const updatedSummary = await calculateUserSkillsSummary(userId);
    ok(res, updatedSummary, 'Skill rating updated successfully');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to update skill rating', 500);
  }
}

