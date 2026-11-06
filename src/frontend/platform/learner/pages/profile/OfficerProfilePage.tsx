import React from 'react';
import { useOfficerProfile } from './useOfficerProfile';
import {
  OfficerProfileBanner,
  OfficerProfileHeaderCard,
  ProfileOverviewTab,
  ProfileProfessionalTab,
  ProfileCompetenciesTab,
  ProfileLearningTab,
  ProfileAssessmentsTab,
  ProfilePreferencesTab,
  EditProfileModal,
  EditGoalsModal,
  CertificatePreviewModal,
  PhotoModal,
} from './components';

// Re-export types for backward compatibility
export type { CertificateItem, AssessmentItem } from './types';

export const OfficerProfilePage: React.FC = () => {
  const {
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
  } = useOfficerProfile();

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* 1. TOP PROFILE BANNER */}
      <OfficerProfileBanner />

      {/* 2. OFFICER PROFILE HEADER CARD */}
      <OfficerProfileHeaderCard
        profileData={profileData}
        onEditPhoto={() => setIsPhotoModalOpen(true)}
        onEditProfile={handleOpenEditModal}
        onCopy={handleCopy}
        copiedField={copiedField}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* 3. TAB VIEWS */}
      {activeTab === 'overview' && (
        <ProfileOverviewTab
          profileData={profileData}
          onNavigateTab={setActiveTab}
          onSelectCert={setSelectedCert}
          onOpenGoalModal={() => setIsGoalModalOpen(true)}
        />
      )}

      {activeTab === 'professional' && (
        <ProfileProfessionalTab currentUser={currentUser} />
      )}

      {activeTab === 'competencies' && <ProfileCompetenciesTab />}

      {activeTab === 'learning' && (
        <ProfileLearningTab onSelectCert={setSelectedCert} />
      )}

      {activeTab === 'assessments' && <ProfileAssessmentsTab />}

      {activeTab === 'preferences' && <ProfilePreferencesTab />}

      {/* 4. MODALS */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editForm={editForm}
        setEditForm={setEditForm}
        onSave={handleSaveProfile}
      />

      <EditGoalsModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        careerGoal={profileData.careerGoal}
        targetRole={profileData.targetRole}
        focusAreas={profileData.focusAreas}
        onGoalChange={(val: string) => setProfileData((prev) => ({ ...prev, careerGoal: val }))}
        onTargetRoleChange={(val: string) => setProfileData((prev) => ({ ...prev, targetRole: val }))}
        newTagInput={newTagInput}
        setNewTagInput={setNewTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />

      <CertificatePreviewModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
        officerName={profileData.name}
        employeeId={profileData.employeeId}
      />

      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        avatarUrl={profileData.avatarUrl}
      />
    </div>
  );
};

export default OfficerProfilePage;
