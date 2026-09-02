import React, { useState } from 'react';
import { 
  ChevronRight, 
  ExternalLink, 
  Edit3, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Filter
} from 'lucide-react';
import { CompanyAssessment, IndicatorAssessment, PillarType } from '../types';

interface IndicatorScoreTableProps {
  assessment: CompanyAssessment;
  onSelectIndicator: (indicator: IndicatorAssessment) => void;
  onQuickOverride: (indicatorCode: string, newScore: number) => void;
}

export const IndicatorScoreTable: React.FC<IndicatorScoreTableProps> = ({
  assessment,
  onSelectIndicator,
  onQuickOverride,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'E' | 'S' | 'G'>('ALL');

  const pillarsToRender = (
    activeFilter === 'ALL' ? ['E', 'S', 'G'] : [activeFilter]
  ) as PillarType[];

  const getScoreBadge = (score: number) => {
    if (score >= 4.0) {
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    } else if (score >= 3.0) {
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    } else if (score >= 2.0) {
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    }
    return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800';
  };

  const getStatusBadge = (status: IndicatorAssessment['status']) => {
    switch (status) {
      case 'disclosed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Disclosed
          </span>
        );
      case 'partially_disclosed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-3 h-3" /> Partial
          </span>
        );
      case 'not_disclosed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-3 h-3" /> Not Disclosed
          </span>
        );
      case 'not_applicable':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
            Not Applicable
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
            Data Unavailable
          </span>
        );
    }
  };

  return (
    <div id="section-indicator-table" className="mt-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header & Filter Strip */}
      <div className="bg-gray-50 dark:bg-slate-800 px-4 py-2.5 border-b border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Indicator Performance Matrix
          </h3>
          <div className="hidden md:flex items-center gap-3 text-[10px] text-gray-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Environmental (35)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Social (35)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Governance (30)</span>
          </div>
        </div>

        {/* Pillar Filter Tabs */}
        <div className="flex items-center gap-1 bg-gray-200/80 dark:bg-slate-700/80 p-0.5 rounded-lg shrink-0 text-xs">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
              activeFilter === 'ALL'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
            }`}
          >
            All (11)
          </button>
          <button
            onClick={() => setActiveFilter('E')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
              activeFilter === 'E'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
            }`}
          >
            Env (35)
          </button>
          <button
            onClick={() => setActiveFilter('S')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
              activeFilter === 'S'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
            }`}
          >
            Social (35)
          </button>
          <button
            onClick={() => setActiveFilter('G')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
              activeFilter === 'G'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
            }`}
          >
            Gov (30)
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white dark:bg-slate-850 shadow-xs z-10">
            <tr className="border-b border-gray-200 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">
              <th className="py-2.5 px-4">Indicator Pillar & Description</th>
              <th className="py-2.5 px-2.5">Principle</th>
              <th className="py-2.5 px-3 text-right">Weight</th>
              <th className="py-2.5 px-3 text-right">Raw (0-5)</th>
              <th className="py-2.5 px-3 text-right">Weighted</th>
              <th className="py-2.5 px-3 text-center">Disclosure Status</th>
              <th className="py-2.5 px-4 text-right">Audit Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60 text-xs">
            {pillarsToRender.map((pKey) => {
              const pillar = assessment.pillars[pKey];
              const pillarColorClass = 
                pKey === 'E' 
                  ? 'bg-blue-50/25 hover:bg-blue-50/60 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 text-blue-900 dark:text-blue-300'
                  : pKey === 'S'
                  ? 'bg-rose-50/25 hover:bg-rose-50/60 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-900 dark:text-rose-300'
                  : 'bg-amber-50/25 hover:bg-amber-50/60 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 text-amber-900 dark:text-amber-300';

              return (
                <React.Fragment key={pKey}>
                  {/* Pillar Sub-Header */}
                  <tr className="bg-gray-100/80 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    <td colSpan={7} className="py-2 px-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              pKey === 'E'
                                ? 'bg-blue-500'
                                : pKey === 'S'
                                ? 'bg-rose-500'
                                : 'bg-amber-500'
                            }`}
                          />
                          <span className="uppercase tracking-wider font-extrabold">{pillar.name} Pillar ({pKey})</span>
                        </span>
                        <span className="font-mono text-xs text-gray-600 dark:text-slate-400">
                          Earned: <strong className="text-slate-900 dark:text-white font-bold">{pillar.earnedScore.toFixed(2)}</strong> / {pillar.maxWeight} ({pillar.percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Indicator Rows */}
                  {pillar.indicators.map((ind) => (
                    <tr
                      key={ind.code}
                      id={`indicator-row-${ind.code.toLowerCase()}`}
                      onClick={() => onSelectIndicator(ind)}
                      className={`cursor-pointer transition-colors group ${pillarColorClass}`}
                    >
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-[11px] px-1.5 py-0.5 rounded bg-white/80 dark:bg-slate-750 border border-gray-200/80 dark:border-slate-700 shrink-0">
                            {ind.code}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-white text-xs truncate max-w-xs sm:max-w-md">
                              {ind.name}
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-slate-400 truncate max-w-xs sm:max-w-md">
                              {ind.evidence.summary}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-2.5">
                        <span className="font-mono text-[11px] font-semibold text-gray-600 dark:text-slate-300">
                          {ind.brsrPrinciple}
                        </span>
                      </td>

                      <td className="py-2 px-3 text-right">
                        <span className="font-mono text-[11px] text-gray-500 dark:text-slate-400">
                          {ind.weight}%
                        </span>
                      </td>

                      <td className="py-2 px-3 text-right">
                        <span className="font-mono font-bold text-xs">
                          {ind.rawScore.toFixed(2)}
                        </span>
                      </td>

                      <td className="py-2 px-3 text-right">
                        <span className="font-mono font-extrabold text-slate-900 dark:text-white text-xs">
                          {ind.weightedScore.toFixed(2)}
                        </span>
                      </td>

                      <td className="py-2 px-3 text-center">
                        {getStatusBadge(ind.status)}
                      </td>

                      <td className="py-2 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectIndicator(ind);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-gray-100 rounded border border-gray-200 dark:border-slate-700 transition-colors"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 text-[10px] text-gray-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1">
        <span>
          <strong>Methodology:</strong> Weighted Score = (Raw Score / 5.0) × Indicator Weight. Total Pillar marks = 100.
        </span>
        <span className="font-mono text-gray-700 dark:text-slate-300 font-bold">
          Weighted Aggregate: {assessment.overallScore.toFixed(2)} / 100.0
        </span>
      </div>
    </div>
  );
};
