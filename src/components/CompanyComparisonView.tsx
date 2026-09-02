import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Scale, Check, Plus, ArrowUpDown, ShieldCheck, Leaf, Users } from 'lucide-react';
import { ALL_COMPANIES_SUMMARY, getCompanyAssessment } from '../data/companies';
import { CompanyAssessment } from '../types';

interface CompanyComparisonViewProps {
  initialCompanyId?: string;
  onViewCompany: (companyId: string) => void;
}

export const CompanyComparisonView: React.FC<CompanyComparisonViewProps> = ({
  initialCompanyId = 'reliance',
  onViewCompany,
}) => {
  // Select multiple companies to compare (defaults to top 3)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    initialCompanyId,
    initialCompanyId === 'tatamotors' ? 'reliance' : 'tatamotors',
    initialCompanyId === 'infosys' ? 'itc' : 'infosys',
  ]);

  const toggleCompany = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 5) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const comparedAssessments: CompanyAssessment[] = selectedIds.map((id) =>
    getCompanyAssessment(id)
  );

  // Grouped Bar chart data
  const barChartData = [
    {
      pillar: 'Environmental (35)',
      ...comparedAssessments.reduce((acc, curr) => {
        acc[curr.shortName || curr.companyName] = curr.pillars.E.earnedScore;
        return acc;
      }, {} as Record<string, number>),
    },
    {
      pillar: 'Social (35)',
      ...comparedAssessments.reduce((acc, curr) => {
        acc[curr.shortName || curr.companyName] = curr.pillars.S.earnedScore;
        return acc;
      }, {} as Record<string, number>),
    },
    {
      pillar: 'Governance (30)',
      ...comparedAssessments.reduce((acc, curr) => {
        acc[curr.shortName || curr.companyName] = curr.pillars.G.earnedScore;
        return acc;
      }, {} as Record<string, number>),
    },
    {
      pillar: 'Overall Score (100)',
      ...comparedAssessments.reduce((acc, curr) => {
        acc[curr.shortName || curr.companyName] = curr.overallScore;
        return acc;
      }, {} as Record<string, number>),
    },
  ];

  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Multi-Enterprise Benchmarking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Compare Listed Indian Companies
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Side-by-side evaluation of BRSR sustainability scores, pillar distribution, and rating tiers.
          </p>
        </div>

        {/* Company Selector Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-slate-500 mr-1">Select Entities:</span>
          {ALL_COMPANIES_SUMMARY.map((comp) => {
            const isSelected = selectedIds.includes(comp.id);
            return (
              <button
                key={comp.id}
                id={`btn-compare-chip-${comp.id}`}
                onClick={() => toggleCompany(comp.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{comp.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table (Section 17 mandate) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Pillar & Score Comparison Matrix
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {comparedAssessments.length} Companies Selected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-750 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Company Name</th>
                <th className="py-3.5 px-3">Industry / Sector</th>
                <th className="py-3.5 px-3 text-center">Overall (100)</th>
                <th className="py-3.5 px-3 text-center">ESG Rating</th>
                <th className="py-3.5 px-3 text-center">Env (35)</th>
                <th className="py-3.5 px-3 text-center">Social (35)</th>
                <th className="py-3.5 px-3 text-center">Gov (30)</th>
                <th className="py-3.5 px-4">Primary BRSR Strength</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-xs">
              {comparedAssessments.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {comp.companyName}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      NSE: {comp.tickerNSE} | BSE: {comp.tickerBSE}
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {comp.industry}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-center">
                    <span className="font-mono text-base font-black text-slate-900 dark:text-white">
                      {comp.overallScore.toFixed(1)}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-mono">
                      {comp.rating}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {comp.pillars.E.earnedScore.toFixed(1)}
                  </td>

                  <td className="py-4 px-3 text-center font-mono font-bold text-teal-600 dark:text-teal-400">
                    {comp.pillars.S.earnedScore.toFixed(1)}
                  </td>

                  <td className="py-4 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                    {comp.pillars.G.earnedScore.toFixed(1)}
                  </td>

                  <td className="py-4 px-4 max-w-xs text-slate-600 dark:text-slate-300">
                    <p className="line-clamp-2 text-[11px]">
                      {comp.strengths[0] || 'High regulatory disclosure completeness.'}
                    </p>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onViewCompany(comp.companyId)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparative Grouped Bar Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Comparative Pillar & Overall Performance
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Direct benchmark across Environmental, Social, Governance and Total ESG Marks
        </p>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="pillar" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              {comparedAssessments.map((comp, idx) => (
                <Bar
                  key={comp.id}
                  dataKey={comp.shortName || comp.companyName}
                  fill={colors[idx % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
