import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Check, 
  ArrowRight, 
  AlertCircle,
  Loader2,
  RefreshCw,
  Building2
} from 'lucide-react';
import { CompanyAssessment, IndicatorAssessment } from '../types';
import { ALL_COMPANIES_SUMMARY } from '../data/companies';

interface AIAssessmentModalProps {
  currentAssessment: CompanyAssessment;
  isOpen: boolean;
  onClose: () => void;
  onApplyAiEvaluation: (updatedIndicators: any[], summaryText: string) => void;
}

export const AIAssessmentModal: React.FC<AIAssessmentModalProps> = ({
  currentAssessment,
  isOpen,
  onClose,
  onApplyAiEvaluation,
}) => {
  const [selectedCompany, setSelectedCompany] = useState(currentAssessment.companyName);
  const [selectedIndustry, setSelectedIndustry] = useState(currentAssessment.industry);
  const [reportingYear, setReportingYear] = useState(currentAssessment.fiscalYear);
  const [disclosureSnippet, setDisclosureSnippet] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setErrorMsg(null);

      // Read text if not PDF
      if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
        try {
          const text = await file.text();
          setDisclosureSnippet(text.slice(0, 10000));
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRunAudit = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      let response;

      if (uploadedFile) {
        // Read file as base64 if PDF, or text
        let fileBase64: string | undefined;
        let fileContent: string | undefined;

        if (uploadedFile.type.includes('pdf') || uploadedFile.name.endsWith('.pdf')) {
          const reader = new FileReader();
          fileBase64 = await new Promise((resolve) => {
            reader.onload = () => {
              const res = reader.result as string;
              resolve(res.includes(',') ? res.split(',')[1] : res);
            };
            reader.readAsDataURL(uploadedFile);
          });
        } else {
          fileContent = disclosureSnippet || (await uploadedFile.text());
        }

        response = await fetch('/api/calculate-brsr-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: uploadedFile.name,
            fileType: uploadedFile.type,
            fileBase64,
            fileContent,
            companyName: selectedCompany,
            fiscalYear: reportingYear,
          }),
        });
      } else {
        response = await fetch('/api/evaluate-brsr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: selectedCompany,
            industry: selectedIndustry,
            fiscalYear: reportingYear,
            disclosureSnippet: disclosureSnippet.trim() || undefined,
          }),
        });
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete AI evaluation');
      }

      setAiResult(data.evaluation);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error executing AI BRSR audit.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToDashboard = () => {
    if (aiResult && aiResult.indicators) {
      onApplyAiEvaluation(aiResult.indicators, aiResult.overallSummary);
      onClose();
    }
  };

  const loadPresetExcerpt = () => {
    setDisclosureSnippet(
      `BRSR Section C, Principle 6 (Environment): Total Scope 1 GHG emissions stood at 18.2 million tCO2e; Scope 2 emissions stood at 4.1 million tCO2e. Energy efficiency measures reduced specific electrical consumption by 8.4%. Renewable power capacity expanded with 240 MW captive solar. Zero liquid discharge maintained across 92% of operational plants. Principle 3 (Employees): LTIFR recorded at 0.14 with zero reportable fatalities.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        id="modal-ai-auditor"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                AI BRSR Auditor & Scoring Assistant
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Powered by Gemini models — Maps textual disclosures to the 11 BRSR indicators
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {!aiResult ? (
            <div className="space-y-4">
              {/* Enterprise Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Enterprise Name
                  </label>
                  <input
                    type="text"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Reliance Industries Limited"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                    Industry / Sector
                  </label>
                  <input
                    type="text"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Energy & Conglomerate"
                  />
                </div>
              </div>

              {/* File Upload Zone */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Upload BRSR / ESG Document File (Optional)
                </label>
                <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-slate-50/70 dark:bg-slate-800/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <UploadCloud className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      {uploadedFile ? (
                        <>
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {uploadedFile.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI Audit
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Select BRSR PDF, TXT, CSV, or DOCX
                          </p>
                          <p className="text-[10px] text-gray-400">
                            Multimodal Gemini models audit file contents directly
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <label className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors">
                      <span>{uploadedFile ? 'Change File' : 'Browse File'}</span>
                      <input
                        type="file"
                        accept=".pdf,.txt,.csv,.json,.doc,.docx,.xlsx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {uploadedFile && (
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-xs text-rose-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Text / Excerpt Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Or Paste Verbatim Excerpts from BRSR Section C
                  </label>
                  <button
                    type="button"
                    onClick={loadPresetExcerpt}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                  >
                    Paste Sample BRSR Excerpt
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={disclosureSnippet}
                  onChange={(e) => setDisclosureSnippet(e.target.value)}
                  placeholder="Paste verbatim excerpts from Section A, B, or C of the company's BRSR report. If left blank, Gemini will audit the uploaded file or verified statutory disclosures..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Run button */}
              <div className="pt-2">
                <button
                  id="btn-run-ai-evaluation-submit"
                  disabled={isLoading || !selectedCompany}
                  onClick={handleRunAudit}
                  className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Auditing BRSR Disclosures with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Run AI BRSR Audit & Score Mapping</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                    AI Audit Summary
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                    SEBI Principles 1–9 Mapped
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {aiResult.overallSummary}
                </p>
              </div>

              {/* Indicator Mapping List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Evaluated Indicators ({aiResult.indicators?.length || 0})
                </h4>
                <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                  {aiResult.indicators?.map((ind: any) => (
                    <div
                      key={ind.code}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white">
                            {ind.code}
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {ind.brsrPrinciple}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                          {Number(ind.score).toFixed(1)} / 5.0
                        </span>
                      </div>

                      <p className="mt-1.5 text-slate-600 dark:text-slate-300 italic">
                        "{ind.evidenceSummary}"
                      </p>

                      <div className="mt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-200/60 dark:border-slate-700/60 pt-1.5">
                        <span><strong>Rationale:</strong> {ind.assessmentRationale}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setAiResult(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-audit</span>
                </button>

                <button
                  id="btn-apply-ai-to-dashboard"
                  onClick={handleApplyToDashboard}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply AI Scores to Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
