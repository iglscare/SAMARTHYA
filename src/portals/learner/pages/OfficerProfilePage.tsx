import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { OfficerSmartIdCard } from '../components/OfficerSmartIdCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/Dialog';
import {
  ShieldCheck,
  Award,
  BookOpen,
  History,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  Download,
  Edit3,
  RefreshCw,
  ExternalLink,
  FileText,
  UserCheck,
  Star,
  Printer,
  Copy,
  Check
} from 'lucide-react';
import { OfficerTrainingRecord } from '@/types/domain';

export const OfficerProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile } = useAuthStore();

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'postings' | 'igot' | 'sparrow' | 'credentials'>('overview');

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<OfficerTrainingRecord | null>(null);
  const [isSyncingIgot, setIsSyncingIgot] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    phone: currentUser.phone || '+91 98104 57291',
    email: currentUser.email || 'priya.sharma92@gov.in',
    officeLocation: currentUser.officeLocation || 'Field Operations Division (HQ), Sankhyiki Bhawan, CBD Belapur, Navi Mumbai - 400614',
    bio: currentUser.bio || 'Senior Statistical Officer specializing in socio-economic survey execution, CAPI real-time field validation, and multi-stage stratification algorithms.',
    emergencyName: currentUser.emergencyContact?.name || 'Col. Vikram Sharma (Retd.)',
    emergencyPhone: currentUser.emergencyContact?.phone || '+91 94140 28190',
  });

  const handleSyncIgot = () => {
    setIsSyncingIgot(true);
    setTimeout(() => {
      setIsSyncingIgot(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3500);
    }, 1400);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      phone: formData.phone,
      email: formData.email,
      officeLocation: formData.officeLocation,
      bio: formData.bio,
      emergencyContact: {
        name: formData.emergencyName,
        relation: currentUser.emergencyContact?.relation || 'Guardian',
        phone: formData.emergencyPhone,
      },
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* 1. SOVEREIGN CIVIL SERVICE HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white shadow-xl">
        {/* Tricolor National Accent Strip */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-amber-500" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-emerald-600" />
        </div>

        <div className="p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-4xl">
            {/* Government Context & Verified Seal */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/35 text-amber-300 text-xs font-bold tracking-wide">
                <img src="/assets/logo.png" alt="Emblem" className="h-4 w-4 object-contain brightness-125" />
                <span>भारत सरकार • GOVERNMENT OF INDIA</span>
              </span>
              <Badge variant="outline" className="text-slate-300 border-white/20 text-xs font-semibold">
                MoSPI • {currentUser.cadre ? currentUser.cadre.split('(')[0] : 'SSS Cadre'}
              </Badge>
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>DigiLocker Verified Service Dossier</span>
              </span>
            </div>

            {/* Officer Name & Title */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white">
                  {currentUser.name}
                </h1>
                {currentUser.hindiName && (
                  <span className="text-lg md:text-2xl font-hindi font-medium text-amber-300">
                    ({currentUser.hindiName})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap text-sm text-slate-300 font-medium">
                <span className="text-white font-bold">{currentUser.designation}</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-300">{currentUser.department}</span>
                <span className="text-slate-500">•</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(currentUser.employeeCode)}
                  className="inline-flex items-center space-x-1 font-mono text-xs px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors cursor-pointer"
                  title="Click to copy Employee Code"
                >
                  <span>Code: {currentUser.employeeCode}</span>
                  {copiedCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-slate-400" />}
                </button>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed font-normal max-w-3xl">
              {currentUser.bio ||
                'Senior Statistical Officer specializing in large-scale socio-economic survey execution, CAPI real-time field validation, and multi-stage stratification algorithms across rural and urban sampling frames.'}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <Button
              onClick={() => setIsDossierModalOpen(true)}
              className="bg-white text-slate-900 hover:bg-slate-100 shadow-md font-bold text-xs h-10 px-4 flex items-center justify-center space-x-2 rounded-xl cursor-pointer"
            >
              <FileText className="h-4 w-4 text-blue-700" />
              <span>Official e-Service Dossier</span>
            </Button>

            <Button
              onClick={handleSyncIgot}
              disabled={isSyncingIgot}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs h-10 px-4 flex items-center justify-center space-x-2 rounded-xl cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-amber-400 ${isSyncingIgot ? 'animate-spin' : ''}`} />
              <span>{isSyncingIgot ? 'Syncing iGOT...' : syncSuccess ? 'iGOT Synced!' : 'Sync iGOT Karmayogi'}</span>
            </Button>

            <Button
              onClick={() => setIsEditModalOpen(true)}
              variant="ghost"
              className="text-slate-200 hover:text-white hover:bg-white/10 text-xs h-10 px-4 flex items-center justify-center space-x-2 rounded-xl border border-white/15 cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5 text-slate-300" />
              <span>Edit Officer Info</span>
            </Button>
          </div>
        </div>

        {/* Decorative Watermark Emblem Background */}
        <div className="absolute right-[-30px] bottom-[-30px] opacity-10 pointer-events-none">
          <img src="/assets/samarthya_emblem.png" alt="Emblem" className="w-80 h-80 object-contain filter invert" />
        </div>
      </div>

      {/* 2. EXECUTIVE KEY METRICS BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Pay Matrix */}
        <Card className="border border-slate-200/90 bg-white shadow-2xs hover:shadow-xs transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                Pay Matrix Level
              </span>
              <Badge variant="navy" className="text-[10px]">7th CPC</Badge>
            </div>
            <h4 className="text-lg font-black text-slate-900">
              {currentUser.payLevel ? currentUser.payLevel.split('•')[0] : 'Level 7 (Group B)'}
            </h4>
            <p className="text-xs text-slate-500 font-mono">
              Scale: ₹44,900 – ₹1,42,400
            </p>
          </CardContent>
        </Card>

        {/* Metric 2: Service Status & Tenure */}
        <Card className="border border-slate-200/90 bg-white shadow-2xs hover:shadow-xs transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                Service Tenure
              </span>
              <Badge variant="emerald" className="text-[10px]">{currentUser.serviceStatus || 'Regular Active'}</Badge>
            </div>
            <h4 className="text-lg font-black text-slate-900">
              3 Years, 2 Months
            </h4>
            <p className="text-xs text-slate-500">
              Appointed: <span className="font-semibold text-slate-800">{currentUser.dateOfJoiningService || '15 July 2021'}</span>
            </p>
          </CardContent>
        </Card>

        {/* Metric 3: SPARROW APAR Benchmark */}
        <Card className="border border-slate-200/90 bg-white shadow-2xs hover:shadow-xs transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                SPARROW APAR Rating
              </span>
              <span className="flex items-center text-xs font-black text-amber-600">
                <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                9.4 / 10.0
              </span>
            </div>
            <h4 className="text-lg font-black text-emerald-700">
              Outstanding Grade
            </h4>
            <p className="text-xs text-slate-500">
              Integrity: <span className="font-semibold text-slate-900">Beyond Doubt</span>
            </p>
          </CardContent>
        </Card>

        {/* Metric 4: Karmayogi Mandate Progress */}
        <Card className="border border-slate-200/90 bg-white shadow-2xs hover:shadow-xs transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                Karmayogi CBC Mandate
              </span>
              <Badge variant="saffron" className="text-[10px]">80% Achieved</Badge>
            </div>
            <h4 className="text-lg font-black text-slate-900">
              40 / 50 Hours
            </h4>
            <Progress value={80} indicatorColor="bg-amber-500" className="h-1.5 mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* 3. DUAL COLUMN LAYOUT: SMART ID CARD + MAIN SEGMENTED TABS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: SMART IDENTITY & COMMAND STACK */}
        <div className="lg:col-span-4 space-y-6">
          {/* Smart ID Digital Pass */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Digital Identity Pass (सेवा पहचान पत्र)</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">
                Active Pass
              </span>
            </div>
            <OfficerSmartIdCard user={currentUser} />
          </div>

          {/* Quick Contact & Station Office Card */}
          <Card className="border border-slate-200/90 bg-white shadow-2xs">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-700" />
                <span>Office Posting & Contact Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-700">
                <Mail className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                <span className="font-mono text-slate-900">{currentUser.email || 'priya.sharma92@gov.in'}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <Phone className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                <span className="font-mono text-slate-900">{currentUser.phone || '+91 98104 57291'}</span>
              </div>
              <div className="flex items-start space-x-2 text-slate-700 pt-2 border-t border-slate-100">
                <MapPin className="h-3.5 w-3.5 text-blue-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-900">
                  {currentUser.officeLocation ||
                    'Field Operations Division (HQ), Sankhyiki Bhawan, CBD Belapur, Navi Mumbai - 400614'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Security Clearances & Access Boundaries */}
          <Card className="border border-slate-200/90 bg-white shadow-2xs">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Security Clearances & Trust Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">National Clearance:</span>
                <span className="font-semibold text-slate-900">{currentUser.securityClearance || 'Level-3 (Confidential)'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Aadhaar e-KYC:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Biometric Verified</span>
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-600">Digital Signature (e-Sign):</span>
                <span className="font-mono text-blue-700 font-bold">e-Sign 3.0 Active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: MAIN SEGMENTED NAVIGATION & TAB PANELS */}
        <div className="lg:col-span-8 space-y-6">
          {/* APPLE-STYLE SEGMENTED CONTROL TABS WITH ORANGE CURSOR UNDERLINE */}
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
            <div className="flex items-center justify-between min-w-max space-x-1">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center space-x-2 cursor-pointer group ${
                  activeTab === 'overview'
                    ? 'bg-blue-50/80 text-blue-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="h-4 w-4 text-blue-700" />
                <span>Overview & Bio</span>
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[3px] rounded-full bg-amber-500 transition-all duration-300 transform origin-left ${
                    activeTab === 'overview'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('postings')}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center space-x-2 cursor-pointer group ${
                  activeTab === 'postings'
                    ? 'bg-blue-50/80 text-blue-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <History className="h-4 w-4 text-blue-700" />
                <span>Postings ({currentUser.postingHistory?.length || 2})</span>
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[3px] rounded-full bg-amber-500 transition-all duration-300 transform origin-left ${
                    activeTab === 'postings'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('igot')}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center space-x-2 cursor-pointer group ${
                  activeTab === 'igot'
                    ? 'bg-blue-50/80 text-blue-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="h-4 w-4 text-blue-700" />
                <span>iGOT & NSSTA ({currentUser.trainingRecords?.length || 4})</span>
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[3px] rounded-full bg-amber-500 transition-all duration-300 transform origin-left ${
                    activeTab === 'igot'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sparrow')}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center space-x-2 cursor-pointer group ${
                  activeTab === 'sparrow'
                    ? 'bg-blue-50/80 text-blue-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Award className="h-4 w-4 text-blue-700" />
                <span>SPARROW APAR</span>
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[3px] rounded-full bg-amber-500 transition-all duration-300 transform origin-left ${
                    activeTab === 'sparrow'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('credentials')}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center space-x-2 cursor-pointer group ${
                  activeTab === 'credentials'
                    ? 'bg-blue-50/80 text-blue-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="h-4 w-4 text-blue-700" />
                <span>Credentials</span>
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[3px] rounded-full bg-amber-500 transition-all duration-300 transform origin-left ${
                    activeTab === 'credentials'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & BIO */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border border-slate-200/90 bg-white shadow-2xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
                    <span>Civil Service Attributes (सेवा विवरण)</span>
                    <Badge variant="outline" className="font-mono text-[10px] border-slate-300">
                      ESTT-CONFIRMED
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Official service record verified by Ministry of Statistics & DoPT Establishment Division.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Date of Birth</span>
                      <p className="font-bold text-slate-900">{currentUser.dateOfBirth || '14 August 1993'}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Date of Joining Service</span>
                      <p className="font-bold text-slate-900">{currentUser.dateOfJoiningService || '15 July 2021'}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Subordinate Cadre</span>
                      <p className="font-bold text-slate-900">{currentUser.cadre}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Blood Group</span>
                      <p className="font-mono font-bold text-amber-600">
                        {currentUser.bloodGroup || 'B+'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">NPS PRAN Number</span>
                      <p className="font-mono font-bold text-slate-900">
                        {currentUser.pranNumber || '1100 4829 1048'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Vigilance Clearance</span>
                      <p className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{currentUser.vigilanceClearance || 'Clear / Integrity Certified'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Emergency Contact / Next of Kin
                      </span>
                      <span className="font-bold text-slate-900">
                        {currentUser.emergencyContact?.name || 'Col. Vikram Sharma (Retd.)'} (
                        {currentUser.emergencyContact?.relation || 'Father'})
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-700">
                      {currentUser.emergencyContact?.phone || '+91 94140 28190'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Chain of Command & Reporting Hierarchy */}
              <Card className="border border-slate-200/90 bg-white shadow-2xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-700" />
                    <span>Appraisal Chain of Command</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Reporting Officer</span>
                      <Badge variant="navy" className="text-[9px]">Grade 1 Authority</Badge>
                    </div>
                    <p className="font-bold text-slate-900">{currentUser.reportingOfficer?.name || 'Dr. Rajesh Verma'}</p>
                    <p className="text-slate-600">{currentUser.reportingOfficer?.designation || 'Deputy Director General (FOD)'}</p>
                    <p className="text-[11px] text-blue-700 font-mono">{currentUser.reportingOfficer?.email || 'rajesh.verma@nic.in'}</p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Reviewing Authority</span>
                      <Badge variant="outline" className="text-[9px]">HAG Level</Badge>
                    </div>
                    <p className="font-bold text-slate-900">{currentUser.reviewingOfficer?.name || 'Smt. Geeta Ramachandran'}</p>
                    <p className="text-slate-600">{currentUser.reviewingOfficer?.designation || 'Additional Director General (Survey Design)'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Language Proficiencies */}
              <Card className="border border-slate-200/90 bg-white shadow-2xs">
                <CardHeader className="pb-2 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold text-slate-900">
                    Official Language Proficiencies (राजभाषा ज्ञान)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2 text-xs">
                  {currentUser.languageProficiencies?.map((lang, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100">
                      <span className="font-semibold text-slate-900">{lang.language}</span>
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="text-slate-600 font-medium">{lang.proficiency}</span>
                        <Badge variant="emerald" className="text-[9px] py-0 px-1.5">Read / Write / Speak</Badge>
                      </div>
                    </div>
                  )) || (
                    <p className="text-slate-600 text-xs">English, Hindi (राजभाषा), Marathi</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: POSTINGS & SERVICE HISTORY */}
          {activeTab === 'postings' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border border-slate-200/90 bg-white shadow-2xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900">
                        Official Posting & Deputation History (पदस्थापना इतिहास)
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Chronological service records with administrative office order numbers.
                      </CardDescription>
                    </div>
                    <Badge variant="saffron" className="text-xs font-bold">
                      {currentUser.postingHistory?.length || 2} Postings Recorded
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="relative border-l-2 border-blue-200 ml-4 space-y-8 pb-2">
                    {currentUser.postingHistory?.map((post, idx) => (
                      <div key={post.id || idx} className="relative pl-6">
                        {/* Timeline Bullet Node */}
                        <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white flex items-center justify-center ${
                          post.isCurrent ? 'bg-blue-700 ring-4 ring-blue-100' : 'bg-slate-400'
                        }`} />

                        <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-3 shadow-2xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-base font-bold font-display text-slate-900">
                                  {post.designation}
                                </h4>
                                {post.isCurrent && (
                                  <Badge variant="emerald" className="text-[10px]">Current Posting</Badge>
                                )}
                              </div>
                              <p className="text-xs font-bold text-blue-700 mt-0.5">
                                {post.department}
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-mono text-xs font-bold shadow-2xs">
                                <Calendar className="h-3.5 w-3.5 mr-1 text-slate-500" />
                                {post.fromPeriod} – {post.toPeriod}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                            <div className="flex items-center space-x-1.5">
                              <MapPin className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                              <span className="text-slate-800 font-medium">{post.officeLocation}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                              <FileText className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                              <span className="text-slate-800">Order No: {post.orderNumber}</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Key Operational Portfolios:
                            </span>
                            <ul className="space-y-1">
                              {post.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="text-xs text-slate-700 flex items-start space-x-2">
                                  <span className="text-blue-700 font-bold">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 3: iGOT KARMAYOGI & NSSTA ACADEMY */}
          {activeTab === 'igot' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border border-blue-200 bg-gradient-to-r from-blue-50/60 via-white to-amber-50/40 shadow-2xs">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center space-x-2">
                        <Badge variant="saffron">iGOT Karmayogi Bharat Mandate</Badge>
                        <span className="text-xs text-slate-500 font-mono">FY 2024-25</span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-slate-900">
                        Annual Continuous Capacity Building Target (DoPT CBC)
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        All central civil service statistical officers must complete a minimum of 50 verified competency hours annually.
                      </p>
                    </div>

                    <div className="min-w-[200px] p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-center md:text-right">
                      <div className="flex justify-between text-xs font-extrabold">
                        <span className="text-slate-900">40 / 50 Hours</span>
                        <span className="text-emerald-700">80% Achieved</span>
                      </div>
                      <Progress value={80} indicatorColor="bg-amber-500" className="h-2" />
                      <span className="text-[10px] text-slate-500 font-medium block">
                        10 Hours remaining for Gold Status
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Training Records Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser.trainingRecords?.map((tr) => (
                  <Card key={tr.id} className="border border-slate-200/90 bg-white flex flex-col justify-between hover:border-blue-300 transition-colors shadow-2xs">
                    <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] font-mono border-slate-300">
                          {tr.certificateId}
                        </Badge>
                        <Badge variant={tr.status === 'Certified' ? 'emerald' : 'saffron'} className="text-[10px]">
                          {tr.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-bold text-slate-900 mt-2 leading-snug">
                        {tr.courseTitle}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-slate-700">
                        {tr.institute}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4 space-y-3 flex-1">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Platform:</span>
                          <span className="font-bold text-blue-700">{tr.platform}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Completion:</span>
                          <span className="font-bold text-slate-900">{tr.completionDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Duration & Credits:</span>
                          <span className="font-bold text-slate-900">{tr.durationHours} Hours ({tr.credits} Credits)</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Performance Score:</span>
                          <span className="font-bold text-emerald-700">{tr.score || 'In Progress'}</span>
                        </div>
                      </div>
                    </CardContent>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">
                        MoSPI Training Cell
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCertificate(tr)}
                        className="text-xs text-blue-700 hover:text-blue-900 h-7 px-2 cursor-pointer"
                      >
                        <span>View Certificate</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SPARROW APAR PERFORMANCE */}
          {activeTab === 'sparrow' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border border-slate-200/90 bg-white shadow-2xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Star className="h-4.5 w-4.5 text-amber-500 fill-current" />
                        <span>SPARROW Annual Performance Appraisal Reports (APAR)</span>
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Smart Performance Appraisal Report Recording Online Window (SPARROW) • DoPT Portal Sync
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs border-slate-300">
                      {currentUser.sparrowId || 'SPARROW-MOSPI-2024-SSS-8492'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* APAR Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-xs text-left">
                      <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase text-[10px] font-extrabold">
                        <tr>
                          <th className="py-3 px-4">Appraisal Year</th>
                          <th className="py-3 px-4">Numerical Score</th>
                          <th className="py-3 px-4">Official Grading</th>
                          <th className="py-3 px-4">Reporting Officer</th>
                          <th className="py-3 px-4">Reviewing Officer</th>
                          <th className="py-3 px-4">Integrity Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {currentUser.aparHistory?.map((apar, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{apar.year}</td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-extrabold font-mono text-xs border border-amber-200">
                                <Star className="h-3 w-3 fill-current mr-1 text-amber-500" />
                                {apar.score} / 10.0
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <Badge variant="emerald">{apar.grading}</Badge>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900">{apar.reportingOfficer}</td>
                            <td className="py-3.5 px-4 font-medium text-slate-600">{apar.reviewingOfficer}</td>
                            <td className="py-3.5 px-4 text-emerald-700 font-bold">
                              {apar.integrityStatus}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Commendations & Citations */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      National Commendations & Citations (प्रशस्ति पत्र)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentUser.awardsAndCommendations?.map((aw) => (
                        <div key={aw.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                              <Award className="h-4 w-4 text-amber-600 shrink-0" />
                              <span>{aw.title}</span>
                            </span>
                            <Badge variant="saffron" className="text-[10px]">{aw.year}</Badge>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-relaxed italic">
                            "{aw.citation}"
                          </p>
                          <span className="text-[10px] font-bold text-blue-700 block">
                            Awarded by: {aw.awardingBody}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 5: DIGITAL VAULT & CREDENTIALS */}
          {activeTab === 'credentials' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border border-slate-200/90 bg-white shadow-2xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                    <span>Digital Service Credentials & DigiLocker e-Verification</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Cryptographically secured credentials issued under the Digital India Act and DoPT guidelines.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>DigiLocker Certified Document Master</span>
                      </span>
                      <Badge variant="emerald">STATUS: ACTIVE</Badge>
                    </div>
                    <p className="text-[11px] text-emerald-950 font-mono break-all leading-relaxed">
                      Doc Hash: {currentUser.digilockerDocHash || 'SHA256:9f8a42b109cde88f01a33b91c89012cd34ef5678ab90123456789abcdef01234'}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-600">National Security Clearance Tier:</span>
                      <span className="font-bold text-slate-900">{currentUser.securityClearance || 'Level-3 (Confidential)'}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-600">Aadhaar e-KYC Verification:</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>UIDAI Biometric Verified</span>
                      </span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-600">NDSAP Data Policy Role:</span>
                      <span className="font-semibold text-slate-900">Authorized Primary Microdata Validator</span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-slate-600">Digital Signature (e-Sign 3.0):</span>
                      <span className="font-mono text-xs text-blue-700 font-bold">Active (Valid through 2028)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: EDIT OFFICER PROFILE */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">Edit Officer Contact Information</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Update your registered official phone, email, emergency contact, and service bio.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProfile} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Official Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98104 57291"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Official Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="officer@gov.in"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Posting HQ Address</label>
              <Input
                value={formData.officeLocation}
                onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                placeholder="Field Operations Division, Sankhyiki Bhawan..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Emergency Contact Name</label>
                <Input
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  placeholder="Guardian / Next of Kin"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Emergency Phone</label>
                <Input
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  placeholder="+91..."
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Service Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-blue-700 hover:bg-blue-800 text-white font-bold">
                Save & Update Record
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: OFFICIAL e-SERVICE BOOK DOSSIER */}
      <Dialog open={isDossierModalOpen} onOpenChange={setIsDossierModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/assets/logo.png" alt="Emblem" className="h-8 w-8 object-contain" />
                <div>
                  <DialogTitle className="text-base font-bold font-display text-slate-900">
                    GOVERNMENT OF INDIA • भारत सरकार
                  </DialogTitle>
                  <p className="text-[11px] text-slate-500 font-hindi">
                    सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय • Ministry of Statistics & Programme Implementation
                  </p>
                </div>
              </div>
              <Badge variant="navy" className="text-[10px]">OFFICIAL DOSSIER</Badge>
            </div>
          </DialogHeader>

          <div className="space-y-5 py-2 text-xs">
            <div className="text-center border-b border-slate-200 pb-3">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900">
                Central Civil Services Officer Electronic Service Book (e-Service Dossier)
              </h3>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                REF: MOSPI-ESTT-2024-SSS-8492 • DIGILOCKER TOKEN: DL-IND-84920
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Full Name:</span>
                  <span className="font-black text-slate-900 text-sm">{currentUser.name} ({currentUser.hindiName})</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Employee Code / PPO:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{currentUser.employeeCode}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Designation & Cadre:</span>
                  <span className="font-semibold text-slate-900">{currentUser.designation}, {currentUser.cadre}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Pay Matrix Level:</span>
                  <span className="font-semibold text-slate-900">{currentUser.payLevel || 'Level 7 (7th CPC)'}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Posting & Deputation Summary:
              </h4>
              <table className="w-full border border-slate-200 text-[11px] rounded-lg overflow-hidden">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th className="p-2 border border-slate-200">Designation</th>
                    <th className="p-2 border border-slate-200">Department / Station</th>
                    <th className="p-2 border border-slate-200">Period</th>
                    <th className="p-2 border border-slate-200">Order Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.postingHistory?.map((p, i) => (
                    <tr key={i} className="border-t border-slate-200">
                      <td className="p-2 border border-slate-200 font-semibold text-slate-900">{p.designation}</td>
                      <td className="p-2 border border-slate-200 text-slate-800">{p.department} ({p.officeLocation.split(',')[0]})</td>
                      <td className="p-2 border border-slate-200 font-mono text-slate-700">{p.fromPeriod} – {p.toPeriod}</td>
                      <td className="p-2 border border-slate-200 font-mono text-[10px] text-slate-600">{p.orderNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-emerald-900 block">
                  Vigilance Clearance & Digital e-Sign Verified
                </span>
                <p className="text-[10px] text-emerald-800">
                  Certified as per Ministry of Statistics & Programme Implementation official records.
                </p>
              </div>
              <ShieldCheck className="h-7 w-7 text-emerald-600 shrink-0" />
            </div>
          </div>

          <DialogFooter className="border-t border-slate-200 pt-3 flex sm:justify-between items-center">
            <span className="text-[10px] font-mono text-slate-500">
              Generated: {new Date().toLocaleDateString('en-IN')}
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => window.print()} className="flex items-center space-x-1 cursor-pointer">
                <Printer className="h-3.5 w-3.5" />
                <span>Print Dossier</span>
              </Button>
              <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white font-bold" onClick={() => setIsDossierModalOpen(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: CERTIFICATE PREVIEW */}
      {selectedCertificate && (
        <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader className="border-b pb-3">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-amber-500" />
                <div>
                  <DialogTitle className="text-base font-bold text-slate-900">
                    Official Certificate of Competency
                  </DialogTitle>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedCertificate.certificateId}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="p-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-100/40 text-center space-y-4 shadow-inner">
              <img src="/assets/logo.png" alt="National Emblem" className="h-12 w-12 object-contain mx-auto" />
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-700">
                  {selectedCertificate.institute}
                </span>
                <h3 className="text-base font-bold font-display text-slate-900">
                  {selectedCertificate.courseTitle}
                </h3>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                This is to certify that <span className="font-bold text-slate-900">{currentUser.name}</span>, {currentUser.designation}, has successfully completed the program with a score of <span className="font-bold text-emerald-700">{selectedCertificate.score || 'Satisfactory'}</span>.
              </p>

              <div className="flex justify-between items-center text-[11px] pt-4 border-t border-amber-200/60 text-slate-600 font-mono">
                <span>Date: {selectedCertificate.completionDate}</span>
                <span>Credits: {selectedCertificate.credits}</span>
                <span>Hours: {selectedCertificate.durationHours} hrs</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setSelectedCertificate(null)}>
                Close
              </Button>
              <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center space-x-1" onClick={() => setSelectedCertificate(null)}>
                <Download className="h-3.5 w-3.5" />
                <span>Download Authenticated PDF</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
