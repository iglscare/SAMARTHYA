import React from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/ui/input-otp';

interface LoginOtpModalProps {
  email: string;
  otpCode: string;
  setOtpCode: (code: string) => void;
  otpError: string;
  isVerifyingOtp: boolean;
  onVerify: (code?: string) => void;
  onClose: () => void;
}

export const LoginOtpModal: React.FC<LoginOtpModalProps> = ({
  email,
  otpCode,
  setOtpCode,
  otpError,
  isVerifyingOtp,
  onVerify,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#0B57D0] flex items-center justify-center mx-auto shadow-2xs">
            <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
          </div>
          <h3 className="text-xl font-black text-[#0B1E48]">
            Two-Factor OTP Verification
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Enter the 6-digit verification code sent to <strong className="text-slate-800">{email}</strong>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-3 py-2">
          <InputOTP
            maxLength={6}
            value={otpCode}
            onChange={(val) => {
              setOtpCode(val);
              if (val.length === 6) {
                onVerify(val);
              }
            }}
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} className="rounded-xl h-11 w-11 text-base font-bold" />
              <InputOTPSlot index={1} className="rounded-xl h-11 w-11 text-base font-bold" />
              <InputOTPSlot index={2} className="rounded-xl h-11 w-11 text-base font-bold" />
              <InputOTPSlot index={3} className="rounded-xl h-11 w-11 text-base font-bold" />
              <InputOTPSlot index={4} className="rounded-xl h-11 w-11 text-base font-bold" />
              <InputOTPSlot index={5} className="rounded-xl h-11 w-11 text-base font-bold" />
            </InputOTPGroup>
          </InputOTP>

          {otpError && <p className="text-xs text-rose-500 font-bold">{otpError}</p>}

          <button
            type="button"
            onClick={() => {
              setOtpCode('123456');
              onVerify('123456');
            }}
            className="text-[11px] font-bold text-[#0B57D0] hover:underline pt-1 cursor-pointer"
          >
            ⚡ Auto-fill Demo OTP (123456)
          </button>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onVerify()}
            disabled={isVerifyingOtp || otpCode.length < 6}
            className="w-full bg-[#0B1E48] hover:bg-[#081635] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50 cursor-pointer shadow-md"
          >
            {isVerifyingOtp ? (
              <span>Verifying with NIC Gateway...</span>
            ) : (
              <>
                <span>Verify & Continue</span>
                <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-xs font-semibold text-slate-500 hover:text-slate-700 py-1.5"
          >
            Cancel & Change Email
          </button>
        </div>
      </div>
    </div>
  );
};
