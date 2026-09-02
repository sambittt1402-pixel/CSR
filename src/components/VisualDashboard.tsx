import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
import { CheckCircle, AlertTriangle, TrendingUp, BarChart2, Compass } from 'lucide-react';
import { CompanyAssessment } from '../types';

interface VisualDashboardProps {
  assessment: CompanyAssessment;
}

export const VisualDashboard: React.FC<VisualDashboardProps> = ({ assessment }) => {
  // Pillar comparison data
  const pillarChartData = [
    {
      pillar: 'Environmental',
      earned: assessment.pillars.E.earnedScore,
      max: assessment.pillars.E.maxWeight,
      percentage: assessment.pillars.E.percentage,
      color: '#3b82f6', // blue
    },
    {
      pillar: 'Social',
      earned: assessment.pillars.S.earnedScore,
      max: assessment.pillars.S.maxWeight,
      percentage: assessment.pillars.S.percentage,
      color: '#f43f5e', // rose
    },
    {
      pillar: 'Governance',
      earned: assessment.pillars.G.earnedScore,
      max: assessment.pillars.G.maxWeight,
      percentage: assessment.pillars.G.percentage,
      color: '#f59e0b', // amber
    },
  ];

  // Radar chart data for all 11 indicators
  const radarData = [
    { subject: 'E1 GHG', score: assessment.pillars.E.indicators[0]?.rawScore || 0, fullMark: 5 },
    { subject: 'E2 Energy', score: assessment.pillars.E.indicators[1]?.rawScore || 0, fullMark: 5 },
    { subject: 'E3 Water', score: assessment.pillars.E.indicators[2]?.rawScore || 0, fullMark: 5 },
    { subject: 'E4 Circular', score: assessment.pillars.E.indicators[3]?.rawScore || 0, fullMark: 5 },
    { subject: 'S1 Safety', score: assessment.pillars.S.indicators[0]?.rawScore || 0, fullMark: 5 },
    { subject: 'S2 Labour', score: assessment.pillars.S.indicators[1]?.rawScore || 0, fullMark: 5 },
    { subject: 'S3 CSR', score: assessment.pillars.S.indicators[2]?.rawScore || 0, fullMark: 5 },
    { subject: 'S4 Consumer', score: assessment.pillars.S.indicators[3]?.rawScore || 0, fullMark: 5 },
    { subject: 'G1 Ethics', score: assessment.pillars.G.indicators[0]?.rawScore || 0, fullMark: 5 },
    { subject: 'G2 Board', score: assessment.pillars.G.indicators[1]?.rawScore || 0, fullMark: 5 },
    { subject: 'G3 Policy', score: assessment.pillars.G.indicators[2]?.rawScore || 0, fullMark: 5 },
  ];

  // Multi-year historical trend data
  const trendData = assessment.historicalTrends.map((t) => ({
    year: t.year.replace('FY ', ''),
    Overall: t.score,
    E: t.eScore,
    S: t.sScore,
    G: t.gScore,
  }));

  return (
    <div className="mt-6 space-y-4">
      {/* 2-Column Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Pillar Breakdown Bar Chart */}
        <div 
          id="chart-pillar-breakdown"
          className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-slate-700">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
                ESG Pillar Score vs Max Weight
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
              100 Marks
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={pillarChartData}
                margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e5e7eb" opacity={0.7} />
                <XAxis 
                  dataKey="pillar" 
                  tick={{ fontSize: 11, fill: '#6b7280' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  domain={[0, 40]} 
                  tick={{ fontSize: 10, fill: '#6b7280' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${Number(value).toFixed(1)} marks`,
                    name === 'earned' ? 'Earned Score' : 'Maximum Weight',
                  ]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="earned" name="Earned Score" radius={[4, 4, 0, 0]}>
                  {pillarChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Bar dataKey="max" name="Maximum Weight" fill="#cbd5e1" opacity={0.3} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-1.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40">
              <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 block">Env (35)</span>
              <span className="text-slate-900 dark:text-slate-100 font-extrabold">{assessment.pillars.E.earnedScore.toFixed(1)} / 35</span>
            </div>
            <div className="p-1.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40">
              <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 block">Soc (35)</span>
              <span className="text-slate-900 dark:text-slate-100 font-extrabold">{assessment.pillars.S.earnedScore.toFixed(1)} / 35</span>
            </div>
            <div className="p-1.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40">
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 block">Gov (30)</span>
              <span className="text-slate-900 dark:text-slate-100 font-extrabold">{assessment.pillars.G.earnedScore.toFixed(1)} / 30</span>
            </div>
          </div>
        </div>

        {/* 11-Indicator Radar Chart */}
        <div 
          id="chart-indicator-radar"
          className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-slate-700">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                BRSR 11-Indicator Maturity Radar
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              Scale 0–5
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" opacity={0.8} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9, fill: '#9ca3af' }} />
                <Radar
                  name={assessment.companyName}
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.35}
                />
                <Tooltip
                  formatter={(val: any) => [`${Number(val).toFixed(2)} / 5.0`, 'Indicator Score']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 text-center text-[10px] font-mono text-gray-500 dark:text-slate-400">
            Outer boundary: SEBI BRSR Best Practice Benchmark (5.0 / 5.0)
          </div>
        </div>
      </div>

      {/* Historical Trend & Strengths/Improvement Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Historical Multi-Year ESG Trend */}
        <div 
          id="chart-multiyear-trend"
          className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-slate-700">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                Historical Performance Trend
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              +{((assessment.historicalTrends[assessment.historicalTrends.length - 1]?.score || 0) - (assessment.historicalTrends[0]?.score || 0)).toFixed(1)} pts
            </span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e5e7eb" opacity={0.7} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Overall" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  dot={{ r: 3.5, fill: '#10b981' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 dark:border-slate-700 pt-2 font-mono">
            <span>Base: {assessment.historicalTrends[0]?.year} ({assessment.historicalTrends[0]?.score})</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Current: {assessment.fiscalYear} ({assessment.overallScore.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Strengths and Improvement Areas */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Strengths Card */}
          <div 
            id="panel-top-strengths"
            className="bg-white dark:bg-slate-800 rounded-xl p-3.5 border border-emerald-200 dark:border-emerald-800/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs mb-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="uppercase tracking-wider">Top BRSR Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {assessment.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-100 dark:border-emerald-800/40 text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
              Verified through Principle 1–9 disclosures
            </div>
          </div>

          {/* Improvement Areas Card */}
          <div 
            id="panel-improvement-areas"
            className="bg-white dark:bg-slate-800 rounded-xl p-3.5 border border-amber-200 dark:border-amber-800/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs mb-2.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="uppercase tracking-wider">Priority Improvement Areas</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {assessment.improvementAreas.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-100 dark:border-amber-800/40 text-[10px] text-amber-700 dark:text-amber-400 font-medium">
              Actionable targets for upcoming reporting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
