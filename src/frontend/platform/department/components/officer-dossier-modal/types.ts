export interface OfficerRecord {
  id: string;
  name: string;
  designation: string;
  unit: string;
  readiness: number;
  topSkillGap: string;
  learningStatus: 'In Training' | 'Not Started' | 'Completed';
  lastActivity: string;
  cadre: string;
  email: string;
  category?: 'needs-attention' | 'in-training' | 'assessment-due';
}

export interface SkillGapItem {
  name: string;
  current: number;
  required: number;
  gap: number;
  isBelow: boolean;
  status: string;
  statusColor: string;
  barColor: string;
}

export interface OfficerDossierModalProps {
  officer: OfficerRecord;
  onClose: () => void;
  onAssignTraining?: (officer: OfficerRecord) => void;
}
