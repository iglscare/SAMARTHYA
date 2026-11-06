/**
 * Shared Authentication Types & Interfaces
 * Used across login, registration, and SSO flows.
 */

import { UserRole } from '@/types/domain';

export type SSOProvider = 'igot' | 'mospi' | 'nic' | 'digilocker';

export interface SSOOption {
  id: SSOProvider;
  name: string;
  badge: string;
  logo: string;
  targetRole: UserRole;
  description?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface OtpVerificationState {
  code: string;
  isVerifying: boolean;
  error?: string;
  targetEmail: string;
}

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation?: string;
  department?: string;
}
