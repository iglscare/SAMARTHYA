import { Request, Response } from 'express';
import { ok, fail } from '../../shared/reply';
import { AuthenticatedRequest } from '../../shared/auth';
import {
  getDepartmentDashboardMetrics,
  getDepartmentRoster,
  getOfficerDossier,
  simulateUpskillingIntervention,
} from './service';

export async function getDeptDashboard(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const metrics = await getDepartmentDashboardMetrics();
    ok(res, metrics, 'Department HR Analytics metrics retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch dashboard metrics', 500);
  }
}

export async function getRoster(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const limit = Number(req.query.limit) || 20;
    const roster = await getDepartmentRoster(limit);
    ok(res, roster, 'Department officer roster retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch roster', 500);
  }
}

export async function getOfficer(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const dossier = await getOfficerDossier(id);
    if (!dossier) {
      fail(res, 'Officer dossier not found', 404);
      return;
    }
    ok(res, dossier, 'Officer competency profile dossier retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch dossier', 500);
  }
}

export async function runSimulator(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { targetDivision, trainingIntervention, participatingOfficersCount } = req.body;
    if (!participatingOfficersCount) {
      fail(res, 'participatingOfficersCount is required for simulation', 400);
      return;
    }
    const result = await simulateUpskillingIntervention({
      targetDivision,
      trainingIntervention,
      participatingOfficersCount: Number(participatingOfficersCount),
    });
    ok(res, result, 'Upskilling simulation completed');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to run upskilling simulation', 500);
  }
}
