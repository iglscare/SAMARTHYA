import React, { useState } from 'react';
import {
  Sparkles,
  Key,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X, 
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import {
  getGeminiApiKey,
  setGeminiApiKey,
  testGeminiConnection,
} from '@/services/geminiAdaptiveAssessment';

interface GeminiKeyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

export const GeminiKeyConfigModal: React.FC<GeminiKeyConfigModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState<string>(() => getGeminiApiKey());
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testGeminiConnection(apiKeyInput);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || 'Connection failed' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    setGeminiApiKey(apiKeyInput);
    if (onKeySaved) onKeySaved();
    onClose();
  };

  const handleClear = () => {
    setApiKeyInput('');
    setGeminiApiKey('');
    setTestResult(null);
    if (onKeySaved) onKeySaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-150 text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0B1E48]">
              Gemini AI Engine Configuration
            </h3>
            <p className="text-xs text-slate-500">
              Computerized Adaptive Testing & Dynamic Question Generation
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 p-3 rounded-xl bg-blue-50/60 border border-blue-100/80 text-xs text-slate-700 leading-relaxed space-y-1.5">
          <div className="font-semibold text-blue-900 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Google AI Studio · Gemini 2.0 Flash Lightning Tunnel</span>
          </div>
          <p className="text-slate-600">
            Powered by high-speed proxy tunnel (<code className="font-mono text-blue-700 font-medium">/api/ai-studio</code>) with keep-alive connection pooling, sub-second computerized adaptive question generation, and instant course recommendation scoring.
          </p>
        </div>

        {/* Key Input */}
        <div className="mt-5 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>AI Studio API Key</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1 text-[11px] font-normal"
            >
              <span>Get API Key from Google AI Studio</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </label>

          <div className="relative">
            <Key className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AQ... or AIzaSy..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Keys are loaded from <code className="text-slate-700 font-semibold">.env (VITE_GEMINI_API_KEY)</code> or persisted securely in your browser session.
          </p>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`mt-4 p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
              testResult.success
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <p className="leading-snug">{testResult.message}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
          >
            Clear Key
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={isTesting || !apiKeyInput.trim()}
              onClick={handleTestConnection}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              {isTesting && <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />}
              <span>Test Connection</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
