import { Response } from 'express';
import { ok, fail } from '../../shared/reply';
import { AuthenticatedRequest } from '../../shared/auth';
import { askMentor, getSuggestedMentorPrompts } from './service';

export async function chatHandler(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { message, officerContext } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      fail(res, 'Valid message string is required', 400);
      return;
    }

    const userId = req.user?.userId || req.user?.id || 'anonymous_officer';
    const response = await askMentor(userId, { message, officerContext });
    ok(res, response, 'Mentor response generated successfully');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Mentor chat failed', 500);
  }
}

export function promptsHandler(_req: AuthenticatedRequest, res: Response): void {
  try {
    const prompts = getSuggestedMentorPrompts();
    ok(res, prompts, 'Suggested mentor prompts retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to retrieve prompts', 500);
  }
}
