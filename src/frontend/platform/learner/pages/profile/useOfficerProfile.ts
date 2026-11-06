import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { OfficerProfileData, CertificateItem, ProfileTabType } from './types';
import { INITIAL_PROFILE_DATA } from './constants';

export const useOfficerProfile = () => {
  const { currentUser } = useAuthStore();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<ProfileTabType>(
    tabParam === 'preferences' ? 'preferences' : 'overview'
  );

  useEffect(() => {
    if (
      tabParam &&
      ['overview', 'professional', 'competencies', 'learning', 'assessments', 'preferences'].includes(tabParam)
    ) {
      setActiveTab(tabParam as ProfileTabType);
    }
  }, [tabParam]);

  const [profileData, setProfileData] = useState<OfficerProfileData>(INITIAL_PROFILE_DATA);

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState('');

  // Form edit temp state
  const [editForm, setEditForm] = useState<OfficerProfileData>({ ...INITIAL_PROFILE_DATA });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOpenEditModal = () => {
    setEditForm({ ...profileData });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setIsEditModalOpen(false);
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !profileData.focusAreas.includes(newTagInput.trim())) {
      setProfileData({
        ...profileData,
        focusAreas: [...profileData.focusAreas, newTagInput.trim()],
      });
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setProfileData({
      ...profileData,
      focusAreas: profileData.focusAreas.filter((t) => t !== tagToRemove),
    });
  };

  return {
    currentUser,
    activeTab,
    setActiveTab,
    profileData,
    setProfileData,
    isEditModalOpen,
    setIsEditModalOpen,
    isPhotoModalOpen,
    setIsPhotoModalOpen,
    isGoalModalOpen,
    setIsGoalModalOpen,
    selectedCert,
    setSelectedCert,
    copiedField,
    newTagInput,
    setNewTagInput,
    editForm,
    setEditForm,
    handleCopy,
    handleOpenEditModal,
    handleSaveProfile,
    handleAddTag,
    handleRemoveTag,
  };
};
