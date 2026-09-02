import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Scale, 
  ShieldCheck, 
  HelpCircle, 
  FileCheck2, 
  AlertTriangle, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { RATING_SCALE } from '../services/scoringEngine';

export const MethodologyView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic & Regulatory Rigor • SEBI Mandate</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          BRSR ESG Rating Methodology & Scoring Architecture
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          A transparent, evidence-grounded scoring framework designed for assessing corporate sustainability disclosures of Indian listed enterprises.
        </p>
      </div>

      {/* 1. Why BRSR? (Section 21) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            01
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Why the BRSR Framework?
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The Business Responsibility and Sustainability Report (BRSR) was instituted by the Securities and Exchange Board of India (SEBI) under Regulation 34(2)(f) of the LODR Regulations. Effective FY 2022–23, BRSR is mandatory for the top 1,000 listed entities by market capitalization. Grounded in the nine National Guidelines on Responsible Business Conduct (NGRBC), BRSR transitions Indian ESG from qualitative narrative brochures to verified, audited, and quantitatively standardized sustainability disclosures.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Standardized Metrics</span>
            Standard format across Scope 1-3 GHG, water, waste, safety, POSH, and board independence.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">BRSR Core Assurance</span>
            SEBI mandates reasonable assurance of selected KPIs to eliminate greenwashing.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-750 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Value Chain Extension</span>
            Encourages transparency across suppliers and logistics partners.
          </div>
        </div>
      </div>

      {/* 2. Why 35:35:30 Weightage? (Section 4 & 21) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
            02
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Why 35E : 35S : 30G Weightage Distribution?
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          While Western ESG frameworks often over-index heavily on carbon emissions alone, the Indian socio-economic operating reality demands parity for workforce safety, fair wages, human rights, and rural community impact:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block mb-1">
              Environmental (35 Marks)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Captures heavy industrial emissions, coal-to-clean transition, industrial water recycling in drought zones, and plastic EPR circularity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800">
            <span className="font-bold text-teal-800 dark:text-teal-300 text-sm block mb-1">
              Social (35 Marks)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Equally vital in emerging economies: contract labor welfare, LTIFR plant safety, statutory 2% CSR community investment, and gender equity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <span className="font-bold text-blue-800 dark:text-blue-300 text-sm block mb-1">
              Governance (30 Marks)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              The foundational bedrock: independent board vigilance, anti-corruption Hotlines, transparent statutory reporting, and zero antitrust penalties.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The 0–5 Scale and 4 Dimensions (Section 10 & 14) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
            03
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            The 0–5 Scoring Scale & Four Dimensional Rubric
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Every indicator is scored on a transparent 0 to 5 scale, derived mathematically as the sum of four distinct 1.25-mark evaluation dimensions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
            <div className="flex justify-between font-bold text-slate-900 dark:text-white mb-1">
              <span>Dimension 1: Disclosure Completeness</span>
              <span className="text-emerald-600">0.0 – 1.25 Marks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Has the enterprise answered all essential questions without evasive or generic qualitative statements?
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
            <div className="flex justify-between font-bold text-slate-900 dark:text-white mb-1">
              <span>Dimension 2: Policy & Clear Target</span>
              <span className="text-emerald-600">0.0 – 1.25 Marks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Does a board-approved policy exist with clear, time-bound targets (e.g. Net Zero by 2035, Zero Waste to Landfill)?
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
            <div className="flex justify-between font-bold text-slate-900 dark:text-white mb-1">
              <span>Dimension 3: Actual Performance</span>
              <span className="text-emerald-600">0.0 – 1.25 Marks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Are empirical improvements visible in current reporting year vs historical baselines (e.g. energy intensity reduction, LTIFR improvement)?
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850">
            <div className="flex justify-between font-bold text-slate-900 dark:text-white mb-1">
              <span>Dimension 4: Assurance & Progress</span>
              <span className="text-emerald-600">0.0 – 1.25 Marks</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Has reasonable or limited third-party assurance been performed by an independent audit agency?
            </p>
          </div>
        </div>
      </div>

      {/* 4. Rating Interpretation Table (Section 20) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            04
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            ESG Rating Scale & Institutional Interpretation
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-750 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Rating Tier</th>
                <th className="py-3 px-4">Score Range</th>
                <th className="py-3 px-4">Interpretation</th>
                <th className="py-3 px-4">Institutional Implication</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {RATING_SCALE.map((tier) => (
                <tr key={tier.rating} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-md font-bold font-mono border ${tier.badgeColor}`}>
                      {tier.rating}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {tier.min} – {tier.max}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {tier.interpretation}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {tier.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Missing Data & Ethical Standards (Section 26, 27, 28) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold tracking-tight">
            Rigorous Ethical Standards & Handling of Missing Disclosures
          </h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          In strict compliance with MBA academic standards and SEBI guidelines, the BRSR ESG Rating System never manufactures or assumes unstated corporate performance:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-amber-400 block mb-1">1. Not Disclosed (0 Marks)</span>
            If a mandatory SEBI question is omitted by the company, a score of 0.0 is awarded. Non-disclosure is penalized to promote market transparency.
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-blue-400 block mb-1">2. Not Applicable (Neutralized)</span>
            If an indicator is genuinely irrelevant (e.g. Scope 1 stack emissions for a pure software firm), the weight is proportionally normalized across applicable metrics.
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-rose-400 block mb-1">3. Poor Performance ≠ Non-Disclosure</span>
            Transparent companies that report high emissions or accidents receive disclosure credit, whereas companies concealing bad metrics receive zero marks.
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="font-bold text-emerald-400 block mb-1">4. Verifiable Evidence Trail</span>
            Every indicator score is backed by an excerpt from the published BRSR filing with Principle number and question reference.
          </div>
        </div>
      </div>
    </div>
  );
};
