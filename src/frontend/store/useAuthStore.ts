import { create } from 'zustand';
import { UserProfile, UserRole } from '@/types/domain';
import { MOCK_USERS } from '@/services/mock/roles.mock';
import { BackendUser, authStorage } from '@/services/authApi';

interface AuthState {
  currentUser: UserProfile;
  currentRole: UserRole;
  isAuthenticated: boolean;
  token: string | null;

  // Actions
  login: (role?: UserRole) => void;
  setAuthUser: (user: BackendUser, token: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

export function backendUserToProfile(u: BackendUser): UserProfile {
  const baseMock = MOCK_USERS[u.role] || MOCK_USERS.learner;
  return {
    ...baseMock,
    id: u.id || baseMock.id,
    name: u.name || baseMock.name,
    hindiName: u.hindiName || baseMock.hindiName,
    designation: u.designation || baseMock.designation,
    cadre: u.cadre || baseMock.cadre,
    department: (u.ministryDepartment as any) || baseMock.department,
    role: u.role || 'learner',
    employeeCode: u.employeeCode || baseMock.employeeCode,
    joinedYear: u.joinedYear || baseMock.joinedYear,
    email: u.email,
    phone: u.mobileNumber,
    digilockerVerified: u.emailVerified,
  };
}

const getInitialAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('samarthya_is_authenticated') === 'true' || Boolean(authStorage.getToken());
};

const getInitialRole = (): UserRole => {
  if (typeof window === 'undefined') return 'learner';
  const savedRole = localStorage.getItem('samarthya_role');
  if (savedRole === 'department' || savedRole === 'admin' || savedRole === 'learner') {
    return savedRole;
  }
  return 'learner';
};

const getInitialUser = (): UserProfile => {
  if (typeof window === 'undefined') return MOCK_USERS.learner;
  try {
    const saved = localStorage.getItem('samarthya_user_profile');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  const role = getInitialRole();
  return MOCK_USERS[role] || MOCK_USERS.learner;
};

const initialRole = getInitialRole();

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: getInitialUser(),
  currentRole: initialRole,
  isAuthenticated: getInitialAuth(),
  token: authStorage.getToken(),

  setAuthUser: (backendUser: BackendUser, token: string) => {
    const profile = backendUserToProfile(backendUser);
    authStorage.setToken(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('samarthya_is_authenticated', 'true');
      localStorage.setItem('samarthya_role', backendUser.role);
      localStorage.setItem('samarthya_user_profile', JSON.stringify(profile));
    }
    set({
      isAuthenticated: true,
      currentRole: backendUser.role,
      currentUser: profile,
      token,
    });
  },

  login: (role: UserRole = 'learner') => {
    const targetUser = MOCK_USERS[role] || MOCK_USERS.learner;
    if (typeof window !== 'undefined') {
      localStorage.setItem('samarthya_is_authenticated', 'true');
      localStorage.setItem('samarthya_role', role);
      localStorage.setItem('samarthya_user_profile', JSON.stringify(targetUser));
    }
    set({
      isAuthenticated: true,
      currentRole: role,
      currentUser: targetUser,
    });
  },

  logout: () => {
    authStorage.removeToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('samarthya_is_authenticated');
      localStorage.removeItem('samarthya_role');
      localStorage.removeItem('samarthya_user_profile');
    }
    set({
      isAuthenticated: false,
      token: null,
    });
  },

  switchRole: (role: UserRole) => {
    const targetUser = MOCK_USERS[role] || MOCK_USERS.learner;
    if (typeof window !== 'undefined') {
      localStorage.setItem('samarthya_role', role);
      localStorage.setItem('samarthya_user_profile', JSON.stringify(targetUser));
    }
    set({
      currentRole: role,
      currentUser: targetUser,
    });
  },

  updateUserProfile: (updates) => {
    set((state) => {
      const nextUser = { ...state.currentUser, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('samarthya_user_profile', JSON.stringify(nextUser));
      }
      return { currentUser: nextUser };
    });
  },
}));
