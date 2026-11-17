import { UserRole } from '@/types/domain';

export interface RegisterPayload {
  ministryDepartment?: string;
  regEmail: string;
  mobileNumber?: string;
  password: string;
  confirmPassword?: string;
  designation?: string;
  jobRole?: string;
  cadre?: string;
  currentAssessment?: string;
  qualification?: string;
  previousCourses?: string[];
  domain?: string;
  name?: string;
}

export interface BackendUser {
  id: string;
  name: string;
  hindiName?: string;
  email: string;
  mobileNumber?: string;
  ministryDepartment: string;
  designation: string;
  jobRole?: string;
  cadre: string;
  role: UserRole;
  currentAssessment?: string;
  employeeCode: string;
  joinedYear: number;
  qualification?: string;
  previousCourses?: string[];
  domain?: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  createdAt: string;
}

export interface AuthSuccessData {
  user: BackendUser;
  token: string;
}

export interface LoginStep1Data {
  requireOtp: boolean;
  email: string;
  devOtpHint?: string;
  message?: string;
}

const TOKEN_KEY = 'samarthya_jwt_token';

export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

const API_BASE = '/api/auth';

export async function apiRegister(payload: RegisterPayload): Promise<AuthSuccessData> {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Registration failed');
  }

  const { user, token } = json.data;
  authStorage.setToken(token);
  return { user, token };
}

export async function apiLogin(email: string, password: string): Promise<LoginStep1Data> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Login failed');
  }

  return json.data;
}

export async function apiVerifyOtp(email: string, otpCode: string): Promise<AuthSuccessData> {
  const res = await fetch(`${API_BASE}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otpCode }),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'OTP verification failed');
  }

  const { user, token } = json.data;
  authStorage.setToken(token);
  return { user, token };
}

export async function apiResendOtp(email: string): Promise<{ devOtpHint?: string; message: string }> {
  const res = await fetch(`${API_BASE}/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to resend OTP');
  }

  return json.data;
}

export async function apiGetMe(): Promise<BackendUser | null> {
  const token = authStorage.getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      authStorage.removeToken();
      return null;
    }

    return json.data;
  } catch {
    return null;
  }
}
