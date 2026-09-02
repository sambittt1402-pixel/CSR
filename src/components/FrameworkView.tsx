import React from 'react';
import { Layers, ShieldCheck, Leaf, Users, CheckCircle2 } from 'lucide-react';
import { BRSR_PRINCIPLES } from '../types';

export const FrameworkView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>National Guidelines on Responsible Business Conduct</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          SEBI BRSR Framework & The 9 NGRBC Principles
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          How the 9 statutory BRSR principles map to Environmental, Social, and Governance pillars in our 100-mark scoring architecture.
        </p>
      </div>

      {/* Pillar Architecture Mapping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Environmental */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-t-4 border-emerald-500 border-x border-b border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold mb-3">
            <Leaf className="w-5 h-5" />
            <h3 className="text-lg">Environmental Pillar (35%)</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Assesses resource stewardship, decarbonization, and ecological protection under Principles 2 and 6.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-slate-900 dark:text-white block">E1: GHG Emissions & Climate (12%)</span>
              Scope 1, 2, and 3 emissions, Net Zero roadmap, and carbon intensity per rupee revenue.
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-slate-900 dark:text-white block">E2: Energy & Renewables (8%)</span>
              Captive solar/wind generation, green power purchase agreements, and energy efficiency.
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-slate-900 dark:text-white block">E3: Water & Waste (8%)</span>
              Water withdrawal in stressed regions, Zero Liquid Discharge (ZLD), hazardous waste recycling.
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-slate-900 dark:text-white block">E4: Circular Products (7%)</span>
              Life cycle assessments (LCA), EPR plastic collection, and recycled input materials.
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-t-4 border-teal-500 border-x border-b border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold mb-3">
            <Users className="w-5 h-5" />
            <h3 className="text-lg">Social Pillar (35%)</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Assesses workforce safety, human rights, community development, and customer privacy under Principles 3, 4, 5, 8 & 9.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="font-bold text-slate-900 dark:text-white block">S1: Employee Well-being & Safety (10%)</span>
              Lost Time Injury Frequency Rate (LTIFR), fatal accidents, health insurance, parental leaves.
            </div>
            <div className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="font-bold text-slate-900 dark:text-white block">S2: Diversity & Labour Practices (10%)</span>
              Women in leadership, POSH anti-harassment committees, median remuneration ratio.
            </div>
            <div className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="font-bold text-slate-900 dark:text-white block">S3: Community & Inclusive Dev (8%)</span>
              Statutory 2% CSR spend, rural upliftment, local procurement, school and clinic projects.
            </div>
            <div className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="font-bold text-slate-900 dark:text-white block">S4: Consumer Responsibility (7%)</span>
              Customer data privacy, cyber defense, grievance redressal speed, product safety recalls.
            </div>
          </div>
        </div>

        {/* Governance */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-t-4 border-blue-500 border-x border-b border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold mb-3">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg">Governance Pillar (30%)</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Assesses board integrity, anti-corruption, transparent disclosure, and regulatory compliance under Principles 1 & 7.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-slate-900 dark:text-white block">G1: Ethics & Anti-Corruption (12%)</span>
              Code of Conduct coverage, anti-bribery investigations, independent whistleblower mechanism.
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-slate-900 dark:text-white block">G2: Board & ESG Governance (10%)</span>
              Independent directors ratio, female board members, dedicated board ESG oversight committee.
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-slate-900 dark:text-white block">G3: Regulatory Responsibility (8%)</span>
              Clean track record with SEBI, Pollution Control Boards (CPCB/SPCB), and fair trade policies.
            </div>
          </div>
        </div>
      </div>

      {/* The 9 NGRBC Principles Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          The Nine Core BRSR Principles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRSR_PRINCIPLES.map((p) => (
            <div
              key={p.code}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {p.code}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.pillar === 'E'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : p.pillar === 'S'
                      ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                      : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}
                >
                  {p.pillar === 'E' ? 'Environmental' : p.pillar === 'S' ? 'Social' : 'Governance'}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                {p.title}
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
