import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { OfficerSmartIdCard } from '../components/OfficerSmartIdCard';
import {
  Briefcase,
  BarChart3,
  BookOpen,
  Play,
  Clock,
  Award,
  FileText,
  Target,
  Camera,
  Edit3,
  MapPin,
  ChevronRight,
  Download,
  Printer,
  X,
  Plus,
  ShieldCheck,
  Landmark,
  CreditCard,
  Check,
  Building2,
  Star,
  GraduationCap,
  UserCheck
} from 'lucide-react';

interface CertificateItem {
  id: string;
  title: string;
  authority: string;
  date: string;
  credentialId: string;
  grade: string;
}

interface AssessmentItem {
  id: string;
  assessment: string;
  competencyArea: string;
  score: number;
  date: string;
  status: 'Completed' | 'Needs Improvement';
}

export const OfficerProfilePage: React.FC = () => {
  const { currentUser } = useAuthStore();

  // Active Tab: Overview (default) | Professional Details | Competencies | Learning & Certifications | Assessments | Account & Preferences
  const [activeTab, setActiveTab] = useState<
    'overview' | 'professional' | 'competencies' | 'learning' | 'assessments' | 'preferences'
  >('overview');

  // Officer details state
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    designation: 'Senior Statistical Officer',
    department: 'National Statistical Office (NSO)',
    ministry: 'Ministry of Statistics & Programme Implementation',
    employeeId: 'MOSPI-20458',
    cadre: 'CSS',
    location: 'New Delhi',
    yearsOfExperience: '8 Years',
    email: 'rajesh.kumar@mospi.gov.in',
    phone: '+91 11 2345 6789',
    dateOfJoining: '12 Aug 2016',
    status: 'Active',
    avatarUrl: '/assets/rajesh_kumar.jpg',
    // Role & Career
    currentRole: 'Senior Statistical Officer',
    currentRoleUnit: 'NSO Field Operations & Data Validation',
    targetRole: 'Deputy Director (Statistics)',
    targetRoleUnit: 'Policy & Data Systems',
    roleReadiness: 72,
    // Career Goals
    careerGoal: 'Strengthen advanced statistical analysis skills to contribute to evidence-based policy making.',
    focusAreas: ['R / Python', 'Advanced Survey Methods', 'Data Governance', 'Official Data Standards'],
  });

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState('');

  // Form edit temp state
  const [editForm, setEditForm] = useState({ ...profileData });

  // Competency Summary Data
  const competencies = [
    { name: 'Statistical Methods', score: 82 },
    { name: 'Data Collection & Survey Design', score: 74 },
    { name: 'Data Validation', score: 68 },
    { name: 'Use of Statistical Software (R/Python)', score: 62 },
    { name: 'Report Writing & Communication', score: 58 },
  ];

  // Recent Assessments Data
  const assessments: AssessmentItem[] = [
    {
      id: 'as-1',
      assessment: 'Statistical Methods (Level 2)',
      competencyArea: 'Statistical Methods',
      score: 82,
      date: '18 May 2025',
      status: 'Completed',
    },
    {
      id: 'as-2',
      assessment: 'Data Validation Quiz',
      competencyArea: 'Data Validation',
      score: 74,
      date: '12 May 2025',
      status: 'Completed',
    },
    {
      id: 'as-3',
      assessment: 'Survey Methodology Test',
      competencyArea: 'Survey Design',
      score: 61,
      date: '04 May 2025',
      status: 'Needs Improvement',
    },
    {
      id: 'as-4',
      assessment: 'Official Statistics (Basics)',
      competencyArea: 'General',
      score: 88,
      date: '20 Apr 2025',
      status: 'Completed',
    },
  ];

  // Certificates & Credentials Data
  const certificates: CertificateItem[] = [
    {
      id: 'cert-1',
      title: 'CPI Compilation & Imputation',
      authority: 'MoSPI (iGOT Karmayogi)',
      date: '20 Feb 2025',
      credentialId: 'KY-MOSPI-2025-CPI-892',
      grade: 'Distinction (88%)',
    },
    {
      id: 'cert-2',
      title: 'Survey Methodology for Official Statistics',
      authority: 'MoSPI (iGOT Karmayogi)',
      date: '12 Jan 2025',
      credentialId: 'KY-MOSPI-2025-SURV-104',
      grade: 'First Class (84%)',
    },
    {
      id: 'cert-3',
      title: 'Data Governance Essentials',
      authority: 'MeitY (iGOT Karmayogi)',
      date: '05 Nov 2024',
      credentialId: 'KY-MEITY-2024-GOV-551',
      grade: 'Distinction (91%)',
    },
  ];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
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

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* 1. TOP PROFILE BANNER CONTAINER WITH TEMPLE BACKGROUND (3D Lightest Outline) */}
      <div className="container-3d relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800 p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Heritage Temple / Rashtrapati Bhavan Panoramic Background Artwork */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-2/3 md:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
          <img
            src="/assets/rashtrapati_banner_panoramic.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-right opacity-45 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
          />
          {/* Seamless gradient fade preserving text legibility on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-slate-900 dark:via-slate-900/70 dark:to-transparent" />
        </div>

        {/* Profile Title & Subtitle Section */}
        <div className="min-w-0 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 max-w-2xl leading-relaxed">
            Your professional information, competencies and learning journey.
          </p>
        </div>
      </div>

      {/* 2. OFFICER PROFILE HEADER CARD WITH 3D LIGHTEST OUTLINE */}
      <div className="container-3d w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        {/* Officer Bio Card Upper Body */}
        <div className="p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left: Avatar with Edit Photo */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 w-full lg:w-auto">
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md">
                  <img
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="mt-2.5 flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs cursor-pointer transition-colors"
                >
                  <Camera className="h-3.5 w-3.5 text-slate-500" />
                  <span>Edit Photo</span>
                </button>
              </div>

              {/* Identity & Cadre Details */}
              <div className="space-y-1 text-center sm:text-left min-w-0">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {profileData.name}
                </h2>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {profileData.designation}
                </p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {profileData.department}
                </p>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  {profileData.ministry}
                </p>

                {/* Metadata Row: Employee ID, Cadre, Location, Experience */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                  {/* Employee ID */}
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                      <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Employee ID
                      </p>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {profileData.employeeId}
                      </p>
                    </div>
                  </div>

                  {/* Cadre */}
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                      <Landmark className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Cadre
                      </p>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {profileData.cadre}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Location
                      </p>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {profileData.location}
                      </p>
                    </div>
                  </div>

                  {/* Years of Experience */}
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                      <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Years of Experience
                      </p>
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                        {profileData.yearsOfExperience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Actions & Official Contact Details */}
            <div className="flex flex-col sm:items-end w-full lg:w-auto space-y-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
              {/* Action Buttons: Status Badge + Edit Profile */}
              <div className="flex items-center justify-start sm:justify-end gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-black">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setEditForm({ ...profileData });
                    setIsEditModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Official Contact Metadata */}
              <div className="space-y-1.5 text-left sm:text-right text-xs">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Official Email
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(profileData.email, 'email')}
                    className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors flex items-center sm:justify-end gap-1 cursor-pointer"
                    title="Copy Email"
                  >
                    <span>{profileData.email}</span>
                    {copiedField === 'email' && <Check className="h-3 w-3 text-emerald-600" />}
                  </button>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Phone (Official)
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(profileData.phone, 'phone')}
                    className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors flex items-center sm:justify-end gap-1 cursor-pointer"
                    title="Copy Phone"
                  >
                    <span>{profileData.phone}</span>
                    {copiedField === 'phone' && <Check className="h-3 w-3 text-emerald-600" />}
                  </button>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Date of Joining
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {profileData.dateOfJoining}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TABS NAVIGATION BAR (Overview | Professional Details | Competencies | ...) */}
        <div className="border-t border-slate-200/80 dark:border-slate-800 px-5 sm:px-6 bg-slate-50/40 dark:bg-slate-900/50 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-6 sm:space-x-8 min-w-max">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'professional', label: 'Professional Details' },
              { id: 'competencies', label: 'Competencies' },
              { id: 'learning', label: 'Learning & Certifications' },
              { id: 'assessments', label: 'Assessments' },
              { id: 'preferences', label: 'Account & Preferences' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-slate-900 dark:text-white font-black'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. OVERVIEW TAB: 3-COLUMN HARMONIOUS METRIC GRID (Matching user reference layout) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ROW 1, CARD 1: ROLE & CAREER */}
          <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-4.5 w-4.5 text-[#0B57D0]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Role & Career
                </h3>
              </div>

              {/* Current Role vs Target Role Comparison */}
              <div className="grid grid-cols-2 gap-4 pb-4">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Current Role
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-tight">
                    {profileData.currentRole}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {profileData.currentRoleUnit}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Target Role
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-tight">
                    {profileData.targetRole}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {profileData.targetRoleUnit}
                  </p>
                </div>
              </div>

              {/* Readiness Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Role Readiness
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {profileData.roleReadiness}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#1A56DB] transition-all duration-700"
                    style={{ width: `${profileData.roleReadiness}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footnote */}
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              Based on your competency assessment and learning progress
            </p>
          </div>

          {/* ROW 1, CARD 2: COMPETENCY SUMMARY */}
          <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4.5 w-4.5 text-[#0B57D0]" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Competency Summary
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('competencies')}
                  className="text-xs font-bold text-[#0B57D0] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Competency Bars List */}
              <div className="space-y-3">
                {competencies.map((comp) => (
                  <div key={comp.name} className="flex items-center justify-between text-xs gap-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate w-48 sm:w-52">
                      {comp.name}
                    </span>
                    <div className="flex items-center flex-1 gap-2.5">
                      <div className="h-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1A56DB] transition-all duration-700"
                          style={{ width: `${comp.score}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 w-8 text-right shrink-0">
                        {comp.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 1, CARD 3: LEARNING RECORD */}
          <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-4.5 w-4.5 text-[#0B57D0]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Learning Record
                </h3>
              </div>

              {/* 2x2 Metric Tiles */}
              <div className="grid grid-cols-2 gap-3">
                {/* Tile 1: Courses Completed */}
                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                      18
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                      Courses Completed
                    </p>
                  </div>
                </div>

                {/* Tile 2: In Progress */}
                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <Play className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                      2
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                      In Progress
                    </p>
                  </div>
                </div>

                {/* Tile 3: Total Learning Hours */}
                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                      42.5 h
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                      Total Learning Hours
                    </p>
                  </div>
                </div>

                {/* Tile 4: Certificates Earned */}
                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0B57D0] flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                      5
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
                      Certificates Earned
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2, CARD 4: RECENT ASSESSMENTS */}
          <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4.5 w-4.5 text-[#0B57D0]" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Recent Assessments
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('assessments')}
                  className="text-xs font-bold text-[#0B57D0] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      <th className="pb-2">Assessment</th>
                      <th className="pb-2">Competency Area</th>
                      <th className="pb-2">Score</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                    {assessments.map((as) => (
                      <tr key={as.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 font-semibold text-slate-900 dark:text-white pr-2">
                          {as.assessment}
                        </td>
                        <td className="py-2.5 text-slate-500 dark:text-slate-400 pr-2">
                          {as.competencyArea}
                        </td>
                        <td className="py-2.5 font-bold text-slate-900 dark:text-white pr-2">
                          {as.score}%
                        </td>
                        <td className="py-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap pr-2">
                          {as.date}
                        </td>
                        <td className="py-2.5 text-right whitespace-nowrap">
                          {as.status === 'Completed' ? (
                            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                              Completed
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-bold">
                              Needs Improvement
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ROW 2, CARD 5: CERTIFICATES & CREDENTIALS */}
          <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-4.5 w-4.5 text-[#0B57D0]" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Certificates & Credentials
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('learning')}
                  className="text-xs font-bold text-[#0B57D0] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      <th className="pb-2">Certificate</th>
                      <th className="pb-2">Issuing Authority</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                    {certificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 font-semibold text-slate-900 dark:text-white pr-2">
                          {cert.title}
                        </td>
                        <td className="py-2.5 text-slate-500 dark:text-slate-400 pr-2">
                          {cert.authority}
                        </td>
                        <td className="py-2.5 text-slate-500 dark:text-slate-400 whitespace-nowrap pr-2">
                          {cert.date}
                        </td>
                        <td className="py-2.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedCert(cert)}
                            className="px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800 text-[#0B57D0] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ROW 2, CARD 6: FOCUS AREAS & GOALS */}
          <div className="container-3d rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-4.5 w-4.5 text-[#0B57D0]" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Focus Areas & Goals
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(true)}
                  className="text-xs font-bold text-[#0B57D0] hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              {/* Career Goal */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Career Goal
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {profileData.careerGoal}
                </p>
              </div>

              {/* Target Role */}
              <div className="space-y-1 mt-3.5">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Target Role
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  {profileData.targetRole}
                </p>
              </div>

              {/* Key Focus Areas */}
              <div className="space-y-1.5 mt-3.5">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Key Focus Areas
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {profileData.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 rounded-full bg-[#EBF3FE] dark:bg-blue-950/60 text-[#0B57D0] dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-900/60"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. OTHER TABS (Interactive & Complete) */}
      {/* Tab: Professional Details */}
      {activeTab === 'professional' && (
        <div className="space-y-6">
          {/* 1. EXECUTIVE CIVIL SERVICE METRIC BENTO BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Pay Matrix */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                  Pay Matrix Level
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                  7th CPC
                </span>
              </div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                Level 7 (Group 'B' Gazetted)
              </h4>
              <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                Scale: ₹44,900 – ₹1,42,400
              </p>
            </div>

            {/* Metric 2: Service Seniority */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                  Service Seniority
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
                  Regular Active
                </span>
              </div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                8 Years, 9 Months
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Appointed: <span className="font-bold text-slate-700 dark:text-slate-300">12 Aug 2016</span> (Batch-2016)
              </p>
            </div>

            {/* Metric 3: SPARROW APAR Benchmark */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                  SPARROW APAR Rating
                </span>
                <span className="flex items-center text-xs font-black text-amber-600 dark:text-amber-400">
                  <Star className="h-3 w-3 fill-amber-500 mr-0.5 text-amber-500" />
                  9.4 / 10.0
                </span>
              </div>
              <h4 className="text-base font-black text-emerald-700 dark:text-emerald-400">
                Outstanding Grade
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Verified: <span className="font-semibold text-slate-700 dark:text-slate-300">ADG (Survey Design)</span>
              </p>
            </div>

            {/* Metric 4: Security & Vigilance */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                  Integrity & Clearance
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
                  Clear
                </span>
              </div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                Vigilance Certified
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Level-3 Confidential Microdata Access
              </p>
            </div>
          </div>

          {/* 2. MAIN 2-COLUMN DOSSIER GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: 3D SMART PASS + SUPERVISORY HIERARCHY + ACADEMIC CREDENTIALS (col-span-5) */}
            <div className="lg:col-span-5 space-y-5">
              {/* 3D Smart Pass */}
              <div className="space-y-2">
                <OfficerSmartIdCard user={currentUser} />
                <p className="text-[11px] text-center text-slate-400 font-medium">
                  Tap card or click "View Reverse" to inspect official cryptographic digital seal.
                </p>
              </div>

              {/* Cadre Supervision & Reporting Hierarchy */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-3.5">
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <UserCheck className="h-4.5 w-4.5 text-[#0B57D0]" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    Supervisory Hierarchy & Appraisal Chain
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Reporting Officer */}
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Reporting Officer (Appraising Authority)
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Dr. Rajesh Verma
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Deputy Director General (Field Operations Division)
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Cadre: ISS (Senior Administrative Grade) • rajesh.verma@nic.in
                    </p>
                  </div>

                  {/* Reviewing Officer */}
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Reviewing Officer (Accepting Authority)
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Smt. Geeta Ramachandran
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Additional Director General (Survey Design & Research Division)
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Cadre: ISS (Higher Administrative Grade) • geeta.ramachandran@gov.in
                    </p>
                  </div>

                  {/* Cadre Authority */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px]">
                    <span className="font-semibold text-slate-500">Cadre Controlling Authority:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">MoSPI (SSS Division)</span>
                  </div>
                </div>
              </div>

              {/* Academic & Statistical Qualifications */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-3.5">
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <GraduationCap className="h-4.5 w-4.5 text-[#0B57D0]" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    Academic & Professional Qualifications
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 dark:text-white">
                        Master of Science (M.Sc.) in Statistics
                      </p>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Distinction (81.4%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      University of Delhi • Faculty of Mathematical Sciences
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Batch 2012 – 2014 • Specialization in Sample Surveys & Econometrics
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 dark:text-white">
                        Bachelor of Science (B.Sc. Hons) in Statistics
                      </p>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        First Class (78.6%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Hindu College, University of Delhi
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Batch 2009 – 2012 • Mathematics & Statistical Computation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CHRONOLOGICAL POSTINGS TIMELINE + APAR RATINGS (col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Chronological Postings Timeline Card */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Landmark className="h-5 w-5 text-[#0B57D0]" />
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">
                        Service History & Postings Dossier
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Verified civil service tenure and postings under Subordinate Statistical Service
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <Download className="h-3.5 w-3.5 text-blue-600" />
                    <span>Download Dossier PDF</span>
                  </button>
                </div>

                {/* Vertical Timeline with Continuous Connector */}
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900/60">
                  
                  {/* Timeline Item 1 (Current Deployment) */}
                  <div className="relative group">
                    {/* Pulsing Emerald Dot Node */}
                    <div className="absolute -left-6 sm:-left-8 top-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950 flex items-center justify-center text-white shadow-xs">
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl border border-emerald-200/80 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 shadow-2xs space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                          Senior Statistical Officer (Supervisory & Quality Control)
                        </h4>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          July 2021 – Present (Current)
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400">
                          <Building2 className="h-3.5 w-3.5" />
                          Field Operations Division (HQ), MoSPI
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          CBD Belapur, Navi Mumbai
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                        Supervision of socio-economic survey rounds, real-time CAPI data quality audit, and multi-stage stratification sample verification across 14 NSSO regional offices. Leading automated outlier detection scripts.
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Official Order: <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">MoSPI/SSS/Order-42/2021</span></span>
                        <span className="font-bold text-emerald-600">Active Station</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="relative group">
                    {/* Blue Dot Node */}
                    <div className="absolute -left-6 sm:-left-8 top-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950 flex items-center justify-center text-white shadow-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                          Statistical Officer (Field Operations & Enumeration)
                        </h4>
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-900 self-start sm:self-auto">
                          July 2018 – June 2021 (3 Yrs)
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400">
                          <Building2 className="h-3.5 w-3.5" />
                          NSSO Regional Office (North Zone)
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          Sankhyiki Bhawan, New Delhi
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                        Executed primary field enumeration for Consumer Expenditure Survey (CES) and Periodic Labour Force Survey (PLFS). Coordinated listing operations in urban agglomerations.
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Official Order: <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">MoSPI/SSS/Order-18/2018</span></span>
                        <span className="font-bold text-blue-600">Relieved with Honors</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 3 (Probation & Induction) */}
                  <div className="relative group">
                    {/* Slate Dot Node */}
                    <div className="absolute -left-6 sm:-left-8 top-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-slate-500 ring-4 ring-slate-100 dark:ring-slate-800 flex items-center justify-center text-white shadow-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                          Statistical Officer (Probation & Foundation Training)
                        </h4>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                          August 2016 – June 2018 (1 Yr, 10 Mos)
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                          <Building2 className="h-3.5 w-3.5 text-slate-400" />
                          National Statistical Systems Training Academy (NSSTA)
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          Greater Noida, Uttar Pradesh
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                        Underwent comprehensive induction curriculum in official statistics, national accounts compilation, consumer price index methodologies, and civil service conduct rules.
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Appointment Letter: <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">MoSPI/SSS/Batch-2016/Appt</span></span>
                        <span className="font-bold text-emerald-600">Probation Confirmed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Annual Performance Appraisal Report (SPARROW APAR Records) */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_-2px_rgba(11,87,208,0.06),0_1px_2px_0_rgba(15,23,42,0.03),inset_0_1px_0_0_#ffffff] outline outline-2 outline-white/95 dark:outline-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        SPARROW APAR Annual Performance Ratings
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Digitally verified appraisals recorded via SPARROW portal
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>e-Signed by Cadre</span>
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      fy: 'FY 2023-24',
                      score: '9.4 / 10.0',
                      grade: 'Outstanding',
                      penPicture: 'Exceptional command over survey methodologies, automated CAPI validation scripts, and exemplary leadership during nationwide surveys.',
                      reporting: 'Dr. Rajesh Verma (DDG, FOD)',
                    },
                    {
                      fy: 'FY 2022-23',
                      score: '9.2 / 10.0',
                      grade: 'Outstanding',
                      penPicture: 'Consistently met stringent survey deadlines with high data integrity and proactive field dispute resolution.',
                      reporting: 'Dr. Rajesh Verma (DDG, FOD)',
                    },
                    {
                      fy: 'FY 2021-22',
                      score: '8.9 / 10.0',
                      grade: 'Very Good',
                      penPicture: 'Diligent, highly adaptive to new digital platforms, and maintained constructive coordination with zonal field staff.',
                      reporting: 'Shri A. K. Mishra (Director, FOD)',
                    },
                  ].map((apar) => (
                    <div key={apar.fy} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-slate-900 dark:text-white">{apar.fy}</span>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                            {apar.grade}
                          </span>
                        </div>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {apar.score}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                        "{apar.penPicture}"
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Appraised by: <span className="text-slate-600 dark:text-slate-400 font-semibold">{apar.reporting}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Competencies */}
      {activeTab === 'competencies' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Full Competency Diagnostics & Gap Analysis</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              iGOT Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Statistical Methods', current: 82, target: 90, desc: 'Hypothesis testing, multi-stage stratification algorithms, and variance estimation.' },
              { name: 'Data Collection & Survey Design', current: 74, target: 85, desc: 'Questionnaire design, listing operations, and non-response mitigation.' },
              { name: 'Data Validation', current: 68, target: 80, desc: 'Logic and range validation algorithms, outlier detection, and clean dataset construction.' },
              { name: 'Use of Statistical Software (R/Python)', current: 62, target: 80, desc: 'Microdata scripting in R tidyverse, automated ETL jobs, and reproducible scripts.' },
              { name: 'Report Writing & Communication', current: 58, target: 75, desc: 'Preparation of executive policy summaries, statistical bulletins, and press releases.' },
              { name: 'National Accounts Integration', current: 52, target: 70, desc: 'Macroeconomic aggregates, GVA sectoral computation, and SUT tables.' },
            ].map((c) => (
              <div key={c.name} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</h4>
                  <span className="text-xs font-black text-[#0B57D0]">{c.current}% (Target: {c.target}%)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{c.desc}</p>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1A56DB] rounded-full" style={{ width: `${c.current}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Learning & Certifications */}
      {activeTab === 'learning' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span>Verified Government Certifications & Karmayogi Passports</span>
            </h3>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
              DigiLocker Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      iGOT Verified
                    </span>
                    <span className="text-xs font-bold text-slate-400">{cert.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {cert.authority}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-2 truncate">
                    ID: {cert.credentialId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0B57D0] font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  View Verified Certificate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Assessments */}
      {activeTab === 'assessments' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Complete Assessment Records</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-3">Assessment Title</th>
                  <th className="pb-3">Competency Area</th>
                  <th className="pb-3">Score Achieved</th>
                  <th className="pb-3">Completion Date</th>
                  <th className="pb-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {assessments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-900 dark:text-white">{a.assessment}</td>
                    <td className="py-3 text-slate-500">{a.competencyArea}</td>
                    <td className="py-3 font-black text-slate-900 dark:text-white">{a.score}%</td>
                    <td className="py-3 text-slate-500">{a.date}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        a.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Account & Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <span>Civil Service Security & Account Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">DigiLocker Biometric Passport</p>
              <p className="text-slate-500">Connected with Aadhaar (UIDAI Verified)</p>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Verified</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">iGOT Karmayogi Single Sign-On</p>
              <p className="text-slate-500">Auto-sync learning progress every 24 hours</p>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">Active SSO</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: EDIT PROFILE DIALOG */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="h-4.5 w-4.5 text-blue-600" />
                <span>Edit Officer Profile Information</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={editForm.designation}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Cadre
                  </label>
                  <input
                    type="text"
                    value={editForm.cadre}
                    onChange={(e) => setEditForm({ ...editForm, cadre: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Official Phone
                  </label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location / Office
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={editForm.yearsOfExperience}
                    onChange={(e) => setEditForm({ ...editForm, yearsOfExperience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: EDIT GOALS & FOCUS AREAS */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="h-4.5 w-4.5 text-blue-600" />
                <span>Edit Career Goals & Focus Areas</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsGoalModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Career Goal
                </label>
                <textarea
                  rows={3}
                  value={profileData.careerGoal}
                  onChange={(e) => setProfileData({ ...profileData, careerGoal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  value={profileData.targetRole}
                  onChange={(e) => setProfileData({ ...profileData, targetRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Focus Areas
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.focusAreas.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-rose-600 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add focus tag..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: OFFICIAL VERIFIED CERTIFICATE PREVIEW */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Government of India • e-Certificate of Competence
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Certificate Parchment View */}
            <div className="p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-gradient-to-b from-[#FFFDF9] to-[#FFF8EE] dark:from-slate-800 dark:to-slate-800 text-center space-y-4 relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-center space-x-3">
                <img src="/assets/samarthya_emblem.png" alt="Emblem" className="h-12 w-auto object-contain" />
              </div>

              <p className="text-[11px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-300">
                Ministry of Statistics & Programme Implementation
              </p>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Certificate of Proficiency
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                This is to certify that
              </p>

              <p className="text-lg font-black text-[#0B57D0] dark:text-blue-400 tracking-tight">
                {profileData.name} ({profileData.employeeId})
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                has successfully demonstrated role readiness and qualified the comprehensive examination for
              </p>

              <p className="text-base font-black text-slate-900 dark:text-white">
                {selectedCert.title}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-amber-200/80 text-left text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold">Credential ID</p>
                  <p className="font-mono font-bold text-slate-700 dark:text-slate-300">{selectedCert.credentialId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold">Date of Issue</p>
                  <p className="font-bold text-slate-700 dark:text-slate-300">{selectedCert.date}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center gap-2 hover:bg-slate-50 cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Certificate</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download Verified PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. MODAL: EDIT PHOTO */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="h-4.5 w-4.5 text-blue-600" />
                <span>Officer Portrait</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-200 shadow-md">
                <img src={profileData.avatarUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-slate-500 text-center font-medium">
                Civil service portrait synchronized with SPARROW / DigiLocker official records.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
