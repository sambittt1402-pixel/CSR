import React from 'react';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Download, 
  Scale, 
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { CompanyAssessment } from '../types';

interface CompanyProfileHeaderProps {
  assessment: CompanyAssessment;
  onYearChange: (year: string) => void;
  onOpenAiAudit: () => void;
  onOpenCompare: () => void;
  onOpenExport: () => void;
  isOverridden: boolean;
  onResetAllOverrides?: () => void;
}

export const CompanyProfileHeader: React.FC<CompanyProfileHeaderProps> = ({
  assessment,
  onYearChange,
  onOpenAiAudit,
  onOpenCompare,
  onOpenExport,
  isOverridden,
  onResetAllOverrides,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-4 px-4 sm:px-6 shadow-xs shrink-0">
      <div className="max-w-7xl mx-auto">
        {/* Top meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">SEBI LISTED:</span>
            <span className="font-mono bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded uppercase">
              NSE: {assessment.tickerNSE}
            </span>
            <span className="font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-1.5 py-0.5 rounded uppercase">
              BSE: {assessment.tickerBSE}
            </span>
            <span className="text-gray-300 dark:text-slate-600">•</span>
            <span className="text-gray-500 dark:text-slate-400 uppercase font-semibold tracking-wider">
              {assessment.industry}
            </span>
            <span className="text-gray-300 dark:text-slate-600">•</span>
            <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-medium">
              {assessment.marketCapTier}
            </span>
          </div>

          {/* Validation Status Badge */}
          <div className="flex items-center gap-2">
            {assessment.verificationStatus === 'illustrative' ? (
              <div 
                id="illustrative-validation-badge"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                title="Illustrative demonstration values requiring ongoing evidence validation from latest SEBI filing"
              >
                <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>Illustrative / requires validation</span>
              </div>
            ) : (
              <div 
                id="verified-validation-badge"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Verified BRSR Disclosures</span>
              </div>
            )}

            {isOverridden && onResetAllOverrides && (
              <button
                onClick={onResetAllOverrides}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:bg-rose-100 transition-colors"
                title="Reset manual evaluator edits to original BRSR assessment"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Overrides</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Header Row: Title & Quick Rating Metric Display */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {assessment.companyName} {assessment.shortName ? `(${assessment.shortName})` : ''}
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              Assessment Period: <span className="font-bold text-gray-700 dark:text-slate-200">{assessment.fiscalYear}</span> | HQ: <span className="text-gray-700 dark:text-slate-200">{assessment.headquarters}</span> | Assessed: <span className="italic">{assessment.assessmentDate}</span>
            </p>
          </div>

          {/* High Density ESG Metric Summary Box */}
          <div className="flex items-center gap-4 sm:gap-6 bg-gray-50 dark:bg-slate-800/90 px-4 sm:px-6 py-2 rounded-lg border border-gray-100 dark:border-slate-700/80 shadow-xs shrink-0">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-400">
                ESG Rating
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none my-0.5">
                {assessment.rating}
              </div>
              <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                {assessment.ratingInterpretation}
              </div>
            </div>

            <div className="w-px h-10 bg-gray-200 dark:bg-slate-700"></div>

            <div className="text-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-400">
                Overall Score
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white italic leading-none my-0.5">
                {assessment.overallScore.toFixed(1)}
                <span className="text-xs text-gray-400 dark:text-slate-400 not-italic font-semibold">/100</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Rank Top 5%
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls & FY Selector */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Year Selector */}
          <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-md p-0.5 border border-gray-200 dark:border-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 text-gray-500 dark:text-slate-400">
              FY:
            </span>
            {assessment.availableYears.map((yr) => (
              <button
                key={yr}
                id={`year-selector-${yr.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => onYearChange(yr)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  assessment.fiscalYear === yr
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-trigger-ai-audit"
              onClick={onOpenAiAudit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI BRSR Audit</span>
            </button>

            <button
              id="btn-trigger-compare"
              onClick={onOpenCompare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-750 rounded transition-all shadow-xs cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-slate-500" />
              <span>Compare</span>
            </button>

            <button
              id="btn-trigger-export"
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 rounded transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Informational Sub-strip */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-gray-500 dark:text-slate-400 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              BRSR: <strong className="text-gray-700 dark:text-slate-300 font-semibold">{assessment.brsrAvailability}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3 text-blue-600" />
              Sustainability Report: <strong className="text-gray-700 dark:text-slate-300 font-semibold">{assessment.sustainabilityReportAvailability}</strong>
            </span>
          </div>
          <div>
            <span>Engine: <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">BRSR-v2.5 (35E : 35S : 30G)</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
