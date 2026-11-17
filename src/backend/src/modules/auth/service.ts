import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { getDB } from '../../config/db';
import { generateToken, UserRole } from '../../shared/auth';
import { createAndSendOtp, verifyOtpCode } from './otp';

export interface UserDocument {
  _id?: ObjectId;
  id: string;
  name: string;
  hindiName?: string;
  email: string;
  mobileNumber?: string;
  passwordHash: string;

  // Professional Metadata
  ministryDepartment: string;
  designation: string;
  jobRole?: string;
  cadre: string;
  role: UserRole;
  targetRoleId?: string;
  currentAssessment?: string;
  employeeCode: string;
  joinedYear: number;

  // Competency & Academic Background
  qualification?: string;
  previousCourses?: string[];
  domain?: string;

  // Verification & Sovereign Identity
  emailVerified: boolean;
  mobileVerified: boolean;
  avatarUrl?: string;
  karmayogiId?: string;
  sparrowId?: string;
  digilockerVerified?: boolean;
  vigilanceClearance?: string;

  createdAt: Date;
  updatedAt: Date;
}

export type SafeUser = Omit<UserDocument, 'passwordHash'>;

export function sanitizeUser(user: UserDocument): SafeUser {
  const { passwordHash: _hash, ...safe } = user;
  return safe;
}

export function detectRole(email: string, designation: string = ''): UserRole {
  const query = `${email} ${designation}`.toLowerCase();
  if (
    query.includes('director') ||
    query.includes('ddg') ||
    query.includes('adg') ||
    query.includes('dept') ||
    query.includes('rajesh')
  ) {
    return 'department';
  } else if (
    query.includes('admin') ||
    query.includes('cto') ||
    query.includes('anand')
  ) {
    return 'admin';
  }
  return 'learner';
}

function deriveNameFromEmail(email: string): string {
  const localPart = email.split('@')[0] || 'Officer';
  return localPart
    .replace(/[._]/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export interface RegisterDTO {
  ministryDepartment?: string;
  regEmail?: string;
  email?: string;
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

export async function registerUser(dto: RegisterDTO): Promise<{ user: SafeUser; token: string }> {
  const email = (dto.regEmail || dto.email || '').trim().toLowerCase();

  if (!email) throw new Error('Official Email ID is required.');
  if (!dto.password) throw new Error('Password is required.');
  if (dto.confirmPassword && dto.password !== dto.confirmPassword) {
    throw new Error('Passwords do not match.');
  }

  const db = getDB();
  const users = db.collection<UserDocument>('users');

  const existing = await users.findOne({ email });
  if (existing) {
    throw new Error('An account with this official email already exists. Please login.');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(dto.password, salt);

  const determinedRole = detectRole(email, dto.designation || '');
  const userName = dto.name || deriveNameFromEmail(email);
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const employeeCode = `MOSPI-${new Date().getFullYear()}-${randomSuffix}`;

  const newUser: UserDocument = {
    id: `usr-${Date.now()}-${randomSuffix}`,
    name: userName,
    email,
    mobileNumber: dto.mobileNumber || '',
    passwordHash,
    ministryDepartment: dto.ministryDepartment || 'MoSPI - National Sample Survey Office (NSSO FOD)',
    designation: dto.designation || 'Senior Statistical Officer (SSO)',
    jobRole: dto.jobRole || 'Field Data Scrutiny & CAPI Operations',
    cadre: dto.cadre || (determinedRole === 'learner' ? 'SSS' : 'ISS'),
    role: determinedRole,
    targetRoleId: 'role-survey-officer',
    currentAssessment: dto.currentAssessment || 'MoSPI National Competency Baseline Assessment (2026)',
    employeeCode,
    joinedYear: new Date().getFullYear(),
    qualification: dto.qualification || 'Post Graduate in Statistics / Applied Statistics',
    previousCourses: Array.isArray(dto.previousCourses) ? dto.previousCourses : [],
    domain: dto.domain || 'Survey Methodology & Field Operations',
    emailVerified: true,
    mobileVerified: Boolean(dto.mobileNumber),
    avatarUrl: '/asset/rajesh_kumar.jpg',
    karmayogiId: `KY-MOSPI-${randomSuffix}`,
    digilockerVerified: true,
    vigilanceClearance: 'Clear / Integrity Certified',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const insert = await users.insertOne(newUser as any);
  newUser._id = insert.insertedId;

  const token = generateToken({
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
    name: newUser.name,
  });

  return { user: sanitizeUser(newUser), token };
}

export async function loginUser(emailInput: string, passwordInput: string): Promise<{
  requireOtp: boolean;
  email: string;
  role: UserRole;
  devOtpHint: string;
}> {
  const email = emailInput.trim().toLowerCase();
  if (!email || !passwordInput) {
    throw new Error('Please provide both official Email ID and Password.');
  }

  const db = getDB();
  const users = db.collection<UserDocument>('users');

  let user: UserDocument | null = await users.findOne({ email });

  // Auto-seed standard officer accounts if they haven't registered yet
  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordInput || 'password123', salt);
    const determinedRole = detectRole(email);
    const userName = deriveNameFromEmail(email);

    const seededUser: UserDocument = {
      id: `usr-seeded-${Date.now()}`,
      name: userName,
      email,
      passwordHash,
      ministryDepartment: 'Ministry of Statistics and Programme Implementation (MoSPI)',
      designation:
        determinedRole === 'admin'
          ? 'Chief Technology Officer'
          : determinedRole === 'department'
          ? 'Director General (NSSO)'
          : 'Senior Statistical Officer',
      cadre: determinedRole === 'learner' ? 'SSS' : 'ISS',
      role: determinedRole,
      employeeCode: `MOSPI-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedYear: 2020,
      emailVerified: true,
      mobileVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const resInsert = await users.insertOne(seededUser as any);
    seededUser._id = resInsert.insertedId;
    user = seededUser;
  }

  const isMatch = await bcrypt.compare(passwordInput, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid credentials. Please verify your password.');
  }

  // Dispatch 2FA OTP
  const otpCode = await createAndSendOtp(email, 'login');

  return {
    requireOtp: true,
    email,
    role: user.role,
    devOtpHint: otpCode,
  };
}

export async function verifyUserOtp(
  emailInput: string,
  codeInput: string,
  purpose: 'login' | 'registration' = 'login'
): Promise<{ user?: SafeUser; token?: string; verified: boolean; email: string }> {
  const email = emailInput.trim().toLowerCase();
  const code = codeInput.trim();

  const isValid = await verifyOtpCode(email, code, purpose);
  if (!isValid) {
    throw new Error('Invalid or expired OTP code. Use 123456 or request a new code.');
  }

  if (purpose === 'registration') {
    return { verified: true, email };
  }

  const db = getDB();
  const users = db.collection<UserDocument>('users');
  const user = await users.findOne({ email });

  if (!user) {
    throw new Error('Officer profile not found for this email.');
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  return { user: sanitizeUser(user), token, verified: true, email };
}

export async function authenticateSso(provider: string = 'igot', role: UserRole = 'learner'): Promise<{
  user: SafeUser;
  token: string;
}> {
  const ssoEmail = `${provider}.officer@mospi.gov.in`;
  const db = getDB();
  const users = db.collection<UserDocument>('users');

  let user: UserDocument | null = await users.findOne({ email: ssoEmail });

  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('sso_auto_generated', salt);

    const ssoUser: UserDocument = {
      id: `usr-sso-${Date.now()}`,
      name: provider === 'igot' ? 'iGOT Karmayogi Sovereign Officer' : 'MoSPI Directorate Officer',
      email: ssoEmail,
      passwordHash,
      ministryDepartment: 'Ministry of Statistics and Programme Implementation (MoSPI)',
      designation: 'Statistical Officer (SSO)',
      cadre: 'SSS',
      role,
      employeeCode: `SSO-${provider.toUpperCase()}-2026`,
      joinedYear: 2021,
      emailVerified: true,
      mobileVerified: true,
      digilockerVerified: true,
      vigilanceClearance: 'Clear / Integrity Certified',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const resInsert = await users.insertOne(ssoUser as any);
    ssoUser._id = resInsert.insertedId;
    user = ssoUser;
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  return { user: sanitizeUser(user), token };
}

export async function getUserById(userId: string): Promise<SafeUser | null> {
  const db = getDB();
  const users = db.collection<UserDocument>('users');
  const user = await users.findOne({ id: userId });
  return user ? sanitizeUser(user) : null;
}

