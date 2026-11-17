import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { fail } from './reply';

export type UserRole = 'learner' | 'department' | 'admin';

const JWT_SECRET = process.env.JWT_SECRET || 'samarthya_sovereign_secret_key_2026_dopt_mospi';

export interface AuthJwtPayload {
  userId: string;
  id?: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthJwtPayload;
}

export function generateToken(payload: AuthJwtPayload): string {
  const normalized = {
    ...payload,
    id: payload.userId || payload.id,
    userId: payload.userId || payload.id,
  };
  return jwt.sign(normalized, JWT_SECRET, {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
  });
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    fail(res, 'Access denied. No authentication token provided.', 401);
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthJwtPayload;
    if (decoded && !decoded.id && decoded.userId) {
      decoded.id = decoded.userId;
    }
    req.user = decoded;
    next();
  } catch (error) {
    fail(
      res,
      'Invalid or expired authentication token.',
      403,
      error instanceof Error ? error.message : 'Token verification failed'
    );
  }
}

export function requireRole(...roles: (UserRole | UserRole[])[]) {
  const allowedRoles: UserRole[] = roles.flat();

  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      fail(res, 'Authentication required.', 401);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      fail(
        res,
        `Forbidden: Access requires one of [${allowedRoles.join(', ')}] role(s).`,
        403
      );
      return;
    }

    next();
  };
}
