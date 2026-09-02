import React from 'react';
import { ShieldCheck, GraduationCap, Building2, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>Academic ESG Research & Practical Corporate Governance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About the BRSR ESG Rating System
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Designed for academic presentation, corporate ESG strategy, equity research, and institutional assessment of Indian listed companies.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            The Purpose of This Platform
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            While global credit rating agencies and ESG aggregators often rely on proprietary "black box" methodologies with hidden weights, the <strong>BRSR ESG Rating System</strong> provides 100% mathematical transparency. Every indicator, dimension score, and rating threshold is visible, auditable, and grounded in official statutory Business Responsibility and Sustainability Report filings submitted to the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
              For MBA Academic Presentations
            </span>
            Equips students and faculty with real-world case studies of India's largest conglomerates (Reliance, Tata Motors, Infosys, ITC, HDFC Bank, L&T) to demonstrate how corporate sustainability translates into quantifiable scores.
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
              For Corporate ESG Analysts
            </span>
            Enables sustainability officers and investment managers to benchmark peers, identify regulatory disclosure gaps, and simulate the effect of operational interventions through manual score overrides.
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Core Methodological Foundations
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Securities and Exchange Board of India (SEBI) Circular No. SEBI/HO/CFD/CMD-2/P/CIR/2021/562</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>National Guidelines on Responsible Business Conduct (NGRBC), Ministry of Corporate Affairs (MCA), Govt. of India</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>SEBI BRSR Core Assurance Mandate for Reasonable Assurance of Selected ESG Metrics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
