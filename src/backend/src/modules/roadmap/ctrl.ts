import { Response } from 'express';
import { ok, fail } from '../../shared/reply';
import { AuthenticatedRequest } from '../../shared/auth';
import {
  getUserRoadmap,
  getRoadmapVersionHistory,
  recalculateAdaptiveRoadmap,
} from './service';

export async function getRoadmap(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || (req.query.userId as string) || 'usr-default-officer';
    const roadmap = await getUserRoadmap(userId);
    ok(res, roadmap, 'Current adaptive learning roadmap retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch roadmap', 500);
  }
}

export async function getRoadmapVersions(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || (req.query.userId as string) || 'usr-default-officer';
    const versions = await getRoadmapVersionHistory(userId);
    ok(res, versions, 'Roadmap version history (v1, v2, v3) retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch roadmap versions', 500);
  }
}

export async function recalculateRoadmap(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { triggerReason } = req.body;

    if (!userId) {
      fail(res, 'User ID is required', 400);
      return;
    }

    const updated = await recalculateAdaptiveRoadmap(userId, triggerReason);
    ok(res, updated, 'Roadmap adaptively recalculated based on latest competency metrics');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to recalculate roadmap', 500);
  }
}

