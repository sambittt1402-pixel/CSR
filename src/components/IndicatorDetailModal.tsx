import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Award, 
  HelpCircle, 
  Quote, 
  Sliders, 
  RotateCcw, 
  Check, 
  Scale, 
  ShieldAlert,
  ExternalLink,
  Info
} from 'lucide-react';
import { IndicatorAssessment } from '../types';

interface IndicatorDetailModalProps {
  indicator: IndicatorAssessment | null;
  onClose: () => void;
  onSaveOverride: (code: string, newScore: number) => void;
  onResetOverride: (code: string) => void;
}

export const IndicatorDetailModal: React.FC<IndicatorDetailModalProps> = ({
  indicator,
  onClose,
  onSaveOverride,
  onResetOverride,
}) => {
  if (!indicator) return null;

  const [overrideValue, setOverrideValue] = useState<number>(indicator.rawScore);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSaveOverride(indicator.code, overrideValue);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    onResetOverride(indicator.code);
    setOverrideValue(indicator.aiSuggestedScore ?? indicator.rawScore);
  };

  const dims = indicator.dimensions;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        id="modal-indicator-detail"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-850/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {indicator.code} • {indicator.brsrPrinciple}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {indicator.pillar === 'E' ? 'Environmental' : indicator.pillar === 'S' ? 'Social' : 'Governance'}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              {indicator.name}
            </h3>
          </div>
          <button
            id="btn-close-indicator-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Top Score Banner (Section 14) */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-center">
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                Indicator Score
              </span>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                {indicator.rawScore.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                Assigned Weight
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {indicator.weight}%
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                Weighted Score
              </span>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                {indicator.weightedScore.toFixed(2)}
              </div>
            </div>
          </div>

          {/* 4 Dimension Scoring Breakdown (Section 14 mandate: 1.25 marks each) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Four-Dimension Evaluation Breakdown (Max 1.25 Each)
              </h4>
              <span className="text-xs text-slate-400 font-mono">Total Max: 5.0 Marks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Dimension 1: Disclosure */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">1. Completeness of Disclosure</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {dims.disclosure.toFixed(2)} / 1.25
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(dims.disclosure / 1.25) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Full reporting of quantitative SEBI parameters.
                </p>
              </div>

              {/* Dimension 2: Policy & Target */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">2. Policy & Clear Target</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {dims.policyTarget.toFixed(2)} / 1.25
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(dims.policyTarget / 1.25) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Time-bound board targets and formal ESG policy.
                </p>
              </div>

              {/* Dimension 3: Actual Performance */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">3. Actual Performance</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {dims.actualPerformance.toFixed(2)} / 1.25
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(dims.actualPerformance / 1.25) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Demonstrated YoY reductions or improvements.
                </p>
              </div>

              {/* Dimension 4: Assurance & Progress */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">4. Assurance & Progress</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {dims.assuranceProgress.toFixed(2)} / 1.25
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(dims.assuranceProgress / 1.25) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Third-party BRSR Core assurance or roadmap.
                </p>
              </div>
            </div>
          </div>

          {/* Section 15: WHY DID THE COMPANY GET THIS SCORE? */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                Why Did The Company Get This Score?
              </span>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {indicator.assessmentRationale}
              </p>
            </div>

            {/* Verbatim BRSR Evidence Excerpt */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                <Quote className="w-4 h-4 text-emerald-600" />
                <span>Statutory BRSR Filing Evidence (Section C):</span>
              </div>
              <blockquote className="text-xs text-slate-700 dark:text-slate-300 italic pl-3 border-l-2 border-emerald-500 leading-relaxed">
                "{indicator.evidence.verbatimExcerpt || indicator.evidence.summary}"
              </blockquote>
            </div>

            {/* Document and Question Citations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
              <div>
                <span className="block font-semibold text-slate-700 dark:text-slate-300">Source Document:</span>
                <span className="truncate block">{indicator.evidence.sourceDocument}</span>
              </div>
              <div>
                <span className="block font-semibold text-slate-700 dark:text-slate-300">SEBI Principle & Section:</span>
                <span>{indicator.evidence.brsrPrinciple} • {indicator.evidence.brsrSection}</span>
              </div>
              <div>
                <span className="block font-semibold text-slate-700 dark:text-slate-300">Question Ref & Year:</span>
                <span>{indicator.evidence.questionRef} ({indicator.evidence.reportingYear})</span>
              </div>
            </div>
          </div>

          {/* Section 24: Manual Score Override Control */}
          <div className="p-5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Evaluator Manual Score Override
                </span>
              </div>
              {indicator.manualOverride && (
                <span className="text-[11px] px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded font-semibold">
                  Currently Overridden
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Adjust the indicator score based on updated audit evidence or custom institutional weightage:
            </p>

            <div className="flex items-center gap-4">
              <input
                id="slider-score-override"
                type="range"
                min="0.0"
                max="5.0"
                step="0.1"
                value={overrideValue}
                onChange={(e) => setOverrideValue(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white w-14 text-right">
                {overrideValue.toFixed(1)} / 5
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                id="btn-reset-ai-score"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to AI Suggested ({indicator.aiSuggestedScore?.toFixed(1) ?? '4.2'})</span>
              </button>

              <button
                id="btn-save-score-override"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved & Recalculated!</span>
                  </>
                ) : (
                  <>
                    <Sliders className="w-4 h-4" />
                    <span>Apply & Recalculate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500">
          <span>Formula: Weighted Score = (Score / 5) × Weight ({indicator.weight}%)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
