/**
 * Shared Authentication Utilities
 * Common validation, role detection, and formatting for public auth flows.
 */

import { UserRole } from '@/types/domain';

/**
 * Detects user platform role based on official email query or designation markers
 */
export function detectRoleFromEmail(email: string): UserRole {
  const query = email.trim().toLowerCase();
  if (
    query.includes('rajesh') ||
    query.includes('director') ||
    query.includes('ddg') ||
    query.includes('dept')
  ) {
    return 'department';
  } else if (
    query.includes('anand') ||
    query.includes('admin') ||
    query.includes('cto')
  ) {
    return 'admin';
  }
  return 'learner';
}

/**
 * Validates whether an email complies with official email formats
 */
export function isValidOfficialEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates 6-digit numeric OTP input
 */
export function isValidOtpCode(code: string): boolean {
  return /^\d{6}$/.test(code.trim());
}
