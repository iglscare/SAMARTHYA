import { create } from 'zustand';
import { UserProfile, UserRole } from '@/types/domain';
import { MOCK_USERS } from '@/services/mock/roles.mock';

interface AuthState {
  currentUser: UserProfile;
  currentRole: UserRole;
  isAuthenticated: boolean;
  
  // Actions
  switchRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: MOCK_USERS.learner,
  currentRole: 'learner',
  isAuthenticated: true,

  switchRole: (role: UserRole) => {
    const targetUser = MOCK_USERS[role] || MOCK_USERS.learner;
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
