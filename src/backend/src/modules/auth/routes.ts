import { Router } from 'express';
import {
  handleRegister,
  handleLogin,
  handleVerifyOtp,
  handleResendOtp,
  handleSso,
  handleGetMe,
} from './ctrl';
import { authenticateToken } from '../../shared/auth';

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/verify-otp', handleVerifyOtp);
router.post('/resend-otp', handleResendOtp);
router.post('/sso', handleSso);
router.get('/me', authenticateToken as any, handleGetMe as any);

export default router;

