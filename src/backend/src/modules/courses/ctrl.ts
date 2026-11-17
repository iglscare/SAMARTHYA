import { Request, Response } from 'express';
import { ok, fail } from '../../shared/reply';
import { AuthenticatedRequest } from '../../shared/auth';
import {
  getCoursesList as fetchCoursesList,
  getCourse,
  recordCourseProgress,
  recordCourseFeedback,
} from './service';

export async function getCoursesList(req: Request, res: Response): Promise<void> {
  try {
    const category = req.query.category as string | undefined;
    const courses = await fetchCoursesList(category);
    ok(res, courses, 'Official courses retrieved successfully');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch courses', 500);
  }
}

export async function getCourseById(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const course = await getCourse(id);
    if (!course) {
      fail(res, 'Course not found', 404);
      return;
    }
    ok(res, course, 'Course details retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to fetch course', 500);
  }
}

export async function updateProgress(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const userId = req.user?.userId || req.body.userId || 'usr-default-officer';
    const { moduleId, progressPercentage } = req.body;

    if (!moduleId || progressPercentage === undefined) {
      fail(res, 'moduleId and progressPercentage are required', 400);
      return;
    }

    const result = await recordCourseProgress(userId, id, moduleId, Number(progressPercentage));
    ok(res, result, 'Course video lesson progress recorded');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to record progress', 500);
  }
}

export async function submitFeedback(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const userId = req.user?.userId || req.body.userId || 'usr-default-officer';
    const { rating, reviewText } = req.body;

    if (!rating) {
      fail(res, 'Rating (1-5) is required', 400);
      return;
    }

    const result = await recordCourseFeedback(userId, id, Number(rating), reviewText || '');
    ok(res, result, 'Course review and rating submitted successfully');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to submit feedback', 500);
  }
}
