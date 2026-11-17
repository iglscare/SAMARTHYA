import { Request, Response } from 'express';
import { ok, fail } from '../../shared/reply';
import { AuthenticatedRequest } from '../../shared/auth';
import {
  registerUser,
  loginUser,
  verifyUserOtp,
  authenticateSso,
  getUserById,
} from './service';
import { createAndSendOtp } from './otp';

export async function handleRegister(req: Request, res: Response): Promise<void> {
  try {
    const result = await registerUser(req.body);
    ok(res, result, 'Officer registered successfully', 201);
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Registration failed', 400);
  }
}

export async function handleLogin(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    ok(res, result, 'Credentials verified. 2FA OTP dispatched.');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Login failed', 401);
  }
}

export async function handleVerifyOtp(req: Request, res: Response): Promise<void> {
  try {
    const { email, otpCode, otp, purpose } = req.body;
    const code = otpCode || otp;
    if (!email || !code) {
      fail(res, 'Both Email and OTP are required', 400);
      return;
    }
    const result = await verifyUserOtp(email, code, purpose || 'login');
    ok(res, result, 'OTP verified successfully. Authenticated.');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'OTP verification failed', 400);
  }
}

export async function handleResendOtp(req: Request, res: Response): Promise<void> {
  try {
    const { email, purpose } = req.body;
    if (!email) {
      fail(res, 'Email ID is required', 400);
      return;
    }
    const code = await createAndSendOtp(email, purpose || 'login');
    ok(res, { devOtpHint: code }, 'Fresh OTP has been dispatched.');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to resend OTP', 400);
  }
}

export async function handleSso(req: Request, res: Response): Promise<void> {
  try {
    const { provider = 'igot', role = 'learner' } = req.body;
    const result = await authenticateSso(provider, role);
    ok(res, result, `Authenticated via Sovereign SSO (${provider.toUpperCase()}).`);
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'SSO authentication failed', 400);
  }
}

export async function handleGetMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      fail(res, 'Unauthorized', 401);
      return;
    }
    const profile = await getUserById(req.user.userId);
    if (!profile) {
      fail(res, 'Officer profile not found', 404);
      return;
    }
    ok(res, profile, 'Officer profile retrieved');
  } catch (error) {
    fail(res, error instanceof Error ? error.message : 'Failed to retrieve profile', 500);
  }
}

