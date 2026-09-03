import React, { useState } from 'react';
import { UserProfile } from '@/types/domain';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheck,
  RotateCw,
  CheckCircle,
  Copy,
  Sparkles,
  Building2,
  Radio,
  Fingerprint
} from 'lucide-react';

interface OfficerSmartIdCardProps {
  user: UserProfile;
}

export const OfficerSmartIdCard: React.FC<OfficerSmartIdCardProps> = ({ user }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulateVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => setVerifiedSuccess(false), 3500);
    }, 1200);
  };

  return (
    <div className="relative group perspective-1000 w-full max-w-md mx-auto">
      {/* Glow highlight background */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-primary/30 to-emerald-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

      {/* Main Glass Card Container */}
      <div
        className={`relative w-full rounded-3xl border border-white/25 dark:border-white/15 bg-gradient-to-br from-navy-950/90 via-slate-900/95 to-navy-900/95 backdrop-blur-2xl text-white shadow-2xl p-6 transition-all duration-700 ease-out overflow-hidden ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Tricolor Sovereign Accent Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-amber-500" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-emerald-600" />
        </div>

        {/* Holographic Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />

        {/* Watermark MoSPI Emblem Background */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
          <img
            src="/assets/samarthya_emblem.png"
            alt="National Emblem Watermark"
            className="w-56 h-56 object-contain filter invert"
          />
        </div>

        {/* FRONT OF CARD */}
        {!isFlipped ? (
          <div className="relative z-10 space-y-4">
            {/* Header: Ministry & DigiLocker Seal */}
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2.5">
                <img
                  src="/assets/logo.png"
                  alt="MoSPI Lion Capital"
                  className="h-9 w-9 object-contain filter brightness-125"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 font-sans">
                      भारत सरकार • GOVT. OF INDIA
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-200 tracking-tight leading-tight">
                    Ministry of Statistics & Programme Implementation
                  </p>
                  <p className="text-[9px] text-slate-400 font-hindi">
                    सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय
                  </p>
                </div>
              </div>

              {/* DigiLocker e-Verified Badge */}
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] font-medium tracking-wide">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span>DigiLocker Verified</span>
                </span>
                <span className="text-[8px] font-mono text-slate-400 mt-0.5">e-Sign v3.2</span>
              </div>
            </div>

            {/* Smart Chip & Contactless Glyph Bar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                {/* Simulated EMV Smart Chip */}
                <div className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow-md flex flex-col justify-between border border-amber-300/60">
                  <div className="flex justify-between border-b border-amber-800/30 pb-0.5">
                    <span className="h-2 w-3 rounded-xs border border-amber-800/40" />
                    <span className="h-2 w-3 rounded-xs border border-amber-800/40" />
                  </div>
                  <div className="flex justify-between">
                    <span className="h-2 w-3 rounded-xs border border-amber-800/40" />
                    <span className="h-2 w-3 rounded-xs border border-amber-800/40" />
                  </div>
                </div>
                <Radio className="h-4 w-4 text-slate-400 rotate-90" />
              </div>

              {/* Security ID Badge Pill */}
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                  Service Digital ID
                </span>
                <p className="font-mono text-xs font-bold text-amber-300 tracking-wider">
                  {user.employeeCode}
                </p>
              </div>
            </div>

            {/* Officer Details & Avatar */}
            <div className="flex items-center space-x-4 pt-1">
              {/* Photo Avatar with Saffron Cadre Halo */}
              <div className="relative shrink-0">
                <div className="h-20 w-20 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-400 via-white to-emerald-400 shadow-xl">
                  <div className="h-full w-full rounded-[14px] bg-navy-900 overflow-hidden flex items-center justify-center font-display font-extrabold text-2xl text-amber-300">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                </div>
                {/* Active Service Status Dot */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-navy-950" />
                </span>
              </div>

              {/* Officer Meta */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-baseline space-x-1.5 flex-wrap">
                  <h3 className="text-base font-bold font-display text-white tracking-tight truncate">
                    {user.name}
                  </h3>
                  {user.hindiName && (
                    <span className="text-xs text-amber-300 font-hindi font-medium">
                      ({user.hindiName})
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-slate-200">
                  {user.designation}
                </p>

                <p className="text-[11px] text-amber-300/90 font-medium truncate">
                  {user.cadre}
                </p>

                <p className="text-[10px] text-slate-300 flex items-center gap-1 truncate pt-0.5">
                  <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                  <span>{user.department}</span>
                </p>
              </div>
            </div>

            {/* Quick Meta Grid: Karmayogi ID & Pay Matrix */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[10px]">
              <div className="bg-white/5 rounded-xl p-2 border border-white/5 backdrop-blur-sm">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
                  iGOT Karmayogi ID
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-mono font-semibold text-slate-200 text-[11px] truncate">
                    {user.karmayogiId || 'KY-MOSPI-2021-08492'}
                  </span>
                  <button
                    onClick={() => handleCopy(user.karmayogiId || 'KY-MOSPI-2021-08492', 'karmayogiId')}
                    className="text-slate-400 hover:text-white p-0.5"
                    title="Copy Karmayogi ID"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-2 border border-white/5 backdrop-blur-sm">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
                  Pay Matrix • 7th CPC
                </span>
                <span className="font-semibold text-emerald-400 text-[11px] block mt-0.5 truncate">
                  {user.payLevel ? user.payLevel.split('•')[0] : 'Level 7'}
                </span>
              </div>
            </div>

            {/* Card Actions Footer */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-mono">
                <Fingerprint className="h-3.5 w-3.5 text-emerald-400" />
                <span>NPS PRAN: {user.pranNumber ? user.pranNumber.replace(/(\d{4})/g, '$1 ').trim() : '1100 4829 1048'}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFlipped(true)}
                className="h-7 text-xs text-amber-300 hover:text-white hover:bg-white/10 rounded-lg px-2 flex items-center space-x-1"
              >
                <RotateCw className="h-3 w-3 mr-1" />
                <span>View Reverse</span>
              </Button>
            </div>
          </div>
        ) : (
          /* REVERSE OF CARD */
          <div className="relative z-10 space-y-3.5 text-left">
            {/* Reverse Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Official Service Dossier Pass
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFlipped(false)}
                className="h-6 text-xs text-amber-300 hover:text-white hover:bg-white/10 rounded-lg px-2"
              >
                <RotateCw className="h-3 w-3 mr-1" />
                <span>Front</span>
              </Button>
            </div>

            {/* Cryptographic Verification & QR Section */}
            <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="h-20 w-20 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-inner">
                {/* Clean Simulated Official QR Code */}
                <div className="relative h-full w-full bg-slate-950 rounded-lg p-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="h-4 w-4 bg-white rounded-xs p-0.5">
                      <div className="h-full w-full bg-slate-950 rounded-xs" />
                    </div>
                    <div className="h-4 w-4 bg-white rounded-xs p-0.5">
                      <div className="h-full w-full bg-slate-950 rounded-xs" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-3 w-3 bg-amber-400 rounded-full" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-4 bg-white rounded-xs p-0.5">
                      <div className="h-full w-full bg-slate-950 rounded-xs" />
                    </div>
                    <div className="h-2 w-2 bg-emerald-400 rounded-xs" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Live Security QR
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">STATUS: VALID</span>
                </div>
                <p className="text-[9px] text-slate-400 leading-tight">
                  Scannable by NIC / MoSPI security checkpoints & iGOT platform.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSimulateVerification}
                  disabled={isVerifying}
                  className="h-6 text-[10px] bg-white/10 hover:bg-white/20 text-white border-white/20 py-0 px-2 mt-1"
                >
                  {isVerifying ? (
                    <RotateCw className="h-2.5 w-2.5 animate-spin mr-1 text-amber-300" />
                  ) : verifiedSuccess ? (
                    <CheckCircle className="h-2.5 w-2.5 mr-1 text-emerald-400" />
                  ) : (
                    <Sparkles className="h-2.5 w-2.5 mr-1 text-amber-400" />
                  )}
                  <span>{verifiedSuccess ? 'Signature Validated' : 'Verify e-Sign Token'}</span>
                </Button>
              </div>
            </div>

            {/* Reverse Metadata List */}
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Security Clearance:</span>
                <span className="font-semibold text-slate-200">Level-3 (Confidential)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Blood Group:</span>
                <span className="font-mono font-semibold text-amber-300">{user.bloodGroup || 'B+'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="font-semibold text-slate-200 truncate ml-2">
                  {user.emergencyContact?.name} ({user.emergencyContact?.phone})
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Reporting Officer:</span>
                <span className="font-semibold text-slate-200 truncate ml-2">{user.reportingOfficer?.name || 'Dr. Rajesh Verma'}</span>
              </div>
            </div>

            {/* Sovereign Issuing Footnote */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400">
              <span>National Statistical Systems • Govt. of India</span>
              <span className="font-mono">PASS-UID: 8492-2021-IND</span>
            </div>
          </div>
        )}
      </div>

      {/* Copy Feedback Toast */}
      {copiedField && (
        <div className="absolute top-2 right-2 z-50 bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 text-xs px-3 py-1 rounded-full shadow-lg backdrop-blur-md animate-fade-in flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-emerald-400" />
          <span>Copied {copiedField} to clipboard!</span>
        </div>
      )}
    </div>
  );
};
