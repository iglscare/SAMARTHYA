import React from 'react';
import {
  useOfficerDossier,
  DEFAULT_RECENT_ASSESSMENTS,
  OfficerDossierHeader,
  OfficerProfileCard,
  OfficerKpiGrid,
  OfficerCompetencySection,
  OfficerTimelineInfoSection,
  OfficerActionBanner,
  OfficerDossierModals,
} from './officer-dossier';

export const OfficerDossierPage: React.FC = () => {
  const dossier = useOfficerDossier();

  return (
    <div className="space-y-5 pb-16 font-sans">
      <OfficerDossierHeader
        toastMessage={dossier.toastMessage}
        onCloseToast={() => dossier.setToastMessage(null)}
        onBack={() => dossier.navigate('/department')}
        onExportCSV={dossier.handleExportCSV}
        onPrint={() => window.print()}
        onExportProfile={dossier.handleExportProfile}
      />

      <OfficerProfileCard
        officer={dossier.officer}
        initials={dossier.initials}
      />

      <OfficerKpiGrid />

      <OfficerCompetencySection
        skillItems={dossier.skillItems}
        onOpenDrilldown={dossier.setActiveDrilldownModal}
      />

      <OfficerTimelineInfoSection
        officer={dossier.officer}
        roadmapList={dossier.roadmapList}
        recentAssessments={DEFAULT_RECENT_ASSESSMENTS}
        onOpenDrilldown={dossier.setActiveDrilldownModal}
        onOpenEdit={() => {
          dossier.setEditForm({
            name: dossier.officer.name,
            designation: dossier.officer.designation,
            unit: dossier.officer.unit,
            email: dossier.officer.email,
            phone: dossier.officer.phone,
            department: dossier.officer.department,
          });
          dossier.setIsEditModalOpen(true);
        }}
      />

      <OfficerActionBanner
        onOpenAssign={() => dossier.setIsAssignModalOpen(true)}
        onExportCSV={dossier.handleExportCSV}
        onExportProfile={dossier.handleExportProfile}
      />

      <OfficerDossierModals
        officer={dossier.officer}
        skillItems={dossier.skillItems}
        isAssignModalOpen={dossier.isAssignModalOpen}
        onCloseAssign={() => dossier.setIsAssignModalOpen(false)}
        onConfirmAssignment={dossier.handleConfirmAssignment}
        isEditModalOpen={dossier.isEditModalOpen}
        onCloseEdit={() => dossier.setIsEditModalOpen(false)}
        editForm={dossier.editForm}
        setEditForm={dossier.setEditForm}
        onSaveEdit={dossier.handleSaveEdit}
        activeDrilldownModal={dossier.activeDrilldownModal}
        onCloseDrilldown={() => dossier.setActiveDrilldownModal(null)}
        onExportProfile={dossier.handleExportProfile}
      />
    </div>
  );
};
