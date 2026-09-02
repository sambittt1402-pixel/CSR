import React from 'react';
import { Leaf, Users, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { CompanyAssessment } from '../types';
import { RATING_SCALE } from '../services/scoringEngine';

interface ScoreOverviewCardsProps {
  assessment: CompanyAssessment;
}

export const ScoreOverviewCards: React.FC<ScoreOverviewCardsProps> = ({ assessment }) => {
  const currentTier = RATING_SCALE.find((t) => t.rating === assessment.rating) || RATING_SCALE[1];

  // SVG Gauge calculation (240 deg arc)
  const scorePercent = Math.min(100, Math.max(0, assessment.overallScore));
  const strokeDashoffset = 380 - (380 * scorePercent) / 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Overall Score & Gauge Card */}
      <div 
        id="card-overall-esg-score" 
        className="bg-white dark:bg-slate-850 rounded-xl p-4 border border-emerald-500/40 dark:border-emerald-500/40 shadow-xs flex flex-col justify-between"
      >
        <div>
          <div className="bg-gray-50 dark:bg-slate-800 -mx-4 -mt-4 px-3.5 py-2 border-b border-gray-200 dark:border-slate-700/80 rounded-t-xl flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Overall ESG Rating
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${currentTier.badgeColor}`}>
              {assessment.rating}
            </span>
          </div>

          {/* Circular Gauge */}
          <div className="my-2.5 flex items-center justify-center relative">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-gray-100 dark:text-slate-700"
                  fill="transparent"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray="380"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>

              {/* Inner Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  {assessment.overallScore.toFixed(1)}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-slate-400 font-semibold mt-0.5">
                  out of 100
                </span>
              </div>
            </div>
          </div>

          <div className="text-center px-2">
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              {assessment.ratingInterpretation}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">
              SEBI Listed percentile top quartile
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-gray-500 dark:text-slate-400">
          <span>Interpretation:</span>
          <span className="font-semibold text-gray-800 dark:text-slate-200">
            {currentTier.interpretation} Posture
          </span>
        </div>
      </div>

      {/* 2. Environmental Pillar Card */}
      <div 
        id="card-pillar-environmental" 
        className="bg-white dark:bg-slate-850 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
      >
        <div>
          <div className="bg-gray-50 dark:bg-slate-800 -mx-4 -mt-4 px-3.5 py-2 border-b border-gray-200 dark:border-slate-700/80 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                Environmental (35)
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-400">
              P2 & P6
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {assessment.pillars.E.earnedScore.toFixed(1)}
              </span>
              <span className="text-xs font-semibold text-gray-400 ml-1">
                / 35.0
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded font-mono">
              {assessment.pillars.E.percentage.toFixed(0)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${assessment.pillars.E.percentage}%` }}
            />
          </div>

          <div className="mt-3 space-y-1 text-[11px] text-gray-600 dark:text-slate-300 font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">E1 GHG & Emissions:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.E.indicators[0]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">E2 Energy & Renewables:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.E.indicators[1]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">E3 Water & Waste:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.E.indicators[2]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">E4 Circular Products:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.E.indicators[3]?.rawScore.toFixed(1)} / 5</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-slate-700/60 text-[10px] text-gray-400 flex items-center justify-between">
          <span>SEBI Weight: 35%</span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">4 Core Indicators</span>
        </div>
      </div>

      {/* 3. Social Pillar Card */}
      <div 
        id="card-pillar-social" 
        className="bg-white dark:bg-slate-850 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
      >
        <div>
          <div className="bg-gray-50 dark:bg-slate-800 -mx-4 -mt-4 px-3.5 py-2 border-b border-gray-200 dark:border-slate-700/80 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                Social (35)
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-400">
              P3, P4, P5, P8, P9
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {assessment.pillars.S.earnedScore.toFixed(1)}
              </span>
              <span className="text-xs font-semibold text-gray-400 ml-1">
                / 35.0
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded font-mono">
              {assessment.pillars.S.percentage.toFixed(0)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-rose-500 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${assessment.pillars.S.percentage}%` }}
            />
          </div>

          <div className="mt-3 space-y-1 text-[11px] text-gray-600 dark:text-slate-300 font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">S1 Safety & Well-being:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.S.indicators[0]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">S2 Diversity & Labour:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.S.indicators[1]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">S3 Community (CSR):</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.S.indicators[2]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">S4 Consumer Trust:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.S.indicators[3]?.rawScore.toFixed(1)} / 5</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-slate-700/60 text-[10px] text-gray-400 flex items-center justify-between">
          <span>SEBI Weight: 35%</span>
          <span className="text-rose-600 dark:text-rose-400 font-medium">4 Core Indicators</span>
        </div>
      </div>

      {/* 4. Governance Pillar Card */}
      <div 
        id="card-pillar-governance" 
        className="bg-white dark:bg-slate-850 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
      >
        <div>
          <div className="bg-gray-50 dark:bg-slate-800 -mx-4 -mt-4 px-3.5 py-2 border-b border-gray-200 dark:border-slate-700/80 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Governance (30)
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-400">
              P1 & P7
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {assessment.pillars.G.earnedScore.toFixed(1)}
              </span>
              <span className="text-xs font-semibold text-gray-400 ml-1">
                / 30.0
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded font-mono">
              {assessment.pillars.G.percentage.toFixed(0)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${assessment.pillars.G.percentage}%` }}
            />
          </div>

          <div className="mt-3 space-y-1 text-[11px] text-gray-600 dark:text-slate-300 font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">G1 Ethics & Anti-Bribery:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.G.indicators[0]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">G2 Board & ESG Oversight:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.G.indicators[1]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">G3 Regulatory Policy:</span>
              <span className="font-bold text-gray-800 dark:text-slate-200">{assessment.pillars.G.indicators[2]?.rawScore.toFixed(1)} / 5</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Audit Readiness:</span>
              <span className="font-semibold text-emerald-600">BRSR Core</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-slate-700/60 text-[10px] text-gray-400 flex items-center justify-between">
          <span>SEBI Weight: 30%</span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">3 Core Indicators</span>
        </div>
      </div>
    </div>
  );
};
