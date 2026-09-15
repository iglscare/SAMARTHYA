import { create } from 'zustand';
import { UserProfile, UserRole } from '@/types/domain';
import { MOCK_USERS } from '@/services/mock/roles.mock';

interface AuthState {
  currentUser: UserProfile;
  currentRole: UserRole;
  isAuthenticated: boolean;
  
  // Actions
  login: (role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const getInitialAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('samarthya_is_authenticated') === 'true';
};

const getInitialRole = (): UserRole => {
  if (typeof window === 'undefined') return 'learner';
  const savedRole = localStorage.getItem('samarthya_role');
  if (savedRole === 'department' || savedRole === 'admin' || savedRole === 'learner') {
    return savedRole;
  }
  return 'learner';
};

const initialRole = getInitialRole();

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: MOCK_USERS[initialRole] || MOCK_USERS.learner,
  currentRole: initialRole,
  isAuthenticated: getInitialAuth(),

  login: (role: UserRole = 'learner') => {
    const targetUser = MOCK_USERS[role] || MOCK_USERS.learner;
    if (typeof window !== 'undefined') {
      localStorage.setItem('samarthya_is_authenticated', 'true');
      localStorage.setItem('samarthya_role', role);
    }
    set({
      isAuthenticated: true,
      currentRole: role,
      currentUser: targetUser,
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('samarthya_is_authenticated');
      localStorage.removeItem('samarthya_role');
    }
    set({
      isAuthenticated: false,
    });
  },

  switchRole: (role: UserRole) => {
    const targetUser = MOCK_USERS[role] || MOCK_USERS.learner;
    if (typeof window !== 'undefined') {
      localStorage.setItem('samarthya_role', role);
    }
    set({
      currentRole: role,
      currentUser: targetUser,
    });
  },

  updateUserProfile: (updates) => {
    set((state) => ({
      currentUser: { ...state.currentUser, ...updates },
    }));
  },
}));
