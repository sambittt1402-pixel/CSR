import React from 'react';
import { 
  X, 
  Printer, 
  FileSpreadsheet, 
  Download, 
  Building2, 
  CheckCircle2, 
  FileText,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { CompanyAssessment } from '../types';

interface ReportExportModalProps {
  assessment: CompanyAssessment;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  assessment,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    // Generate full CSV of indicators, weights, scores, and evidence
    const headers = [
      'Pillar',
      'Indicator Code',
      'Indicator Name',
      'BRSR Principle',
      'Weight (%)',
      'Raw Score (out of 5)',
      'Weighted Score',
      'Disclosure Dimension',
      'Policy Target Dimension',
      'Actual Performance Dimension',
      'Assurance Dimension',
      'Status',
      'Evidence Summary',
      'Verbatim BRSR Excerpt',
      'Document Source',
      'Question Ref',
    ];

    const rows: string[][] = [];

    ['E', 'S', 'G'].forEach((pKey) => {
      const p = assessment.pillars[pKey as 'E' | 'S' | 'G'];
      p.indicators.forEach((ind) => {
        rows.push([
          p.name,
          ind.code,
          `"${ind.name}"`,
          ind.brsrPrinciple,
          ind.weight.toString(),
          ind.rawScore.toFixed(2),
          ind.weightedScore.toFixed(2),
          ind.dimensions.disclosure.toFixed(2),
          ind.dimensions.policyTarget.toFixed(2),
          ind.dimensions.actualPerformance.toFixed(2),
          ind.dimensions.assuranceProgress.toFixed(2),
          ind.status,
          `"${ind.evidence.summary.replace(/"/g, '""')}"`,
          `"${(ind.evidence.verbatimExcerpt || '').replace(/"/g, '""')}"`,
          `"${ind.evidence.sourceDocument}"`,
          `"${ind.evidence.questionRef}"`,
        ]);
      });
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      `"BRSR ESG Assessment Report - ${assessment.companyName} (${assessment.fiscalYear})"\n` +
      `"Overall ESG Score: ${assessment.overallScore.toFixed(2)} / 100","Rating: ${assessment.rating} - ${assessment.ratingInterpretation}"\n\n` +
      headers.join(',') +
      '\n' +
      rows.map((r) => r.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `BRSR_ESG_Report_${assessment.tickerNSE}_${assessment.fiscalYear.replace(/\s+/g, '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        id="modal-report-export"
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Export Comprehensive ESG Rating Dossier
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              SEBI Compliant BRSR Assessment Report • MBA & Academic Presentation Format
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ready for Institutional Export & Print Submission</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-download-csv-export"
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Download CSV / Excel</span>
            </button>

            <button
              id="btn-trigger-print-pdf"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs">
          {/* Document Masthead */}
          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Institutional BRSR ESG Assessment Report
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {assessment.companyName}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span>NSE: {assessment.tickerNSE}</span>
                <span>•</span>
                <span>BSE: {assessment.tickerBSE}</span>
                <span>•</span>
                <span>Sector: {assessment.industry}</span>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {assessment.overallScore.toFixed(1)} / 100
              </span>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Rating: {assessment.rating} ({assessment.ratingInterpretation})
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Reporting Fiscal Year:</span>
              <span className="font-bold">{assessment.fiscalYear}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Headquarters:</span>
              <span className="font-bold">{assessment.headquarters}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Filing Availability:</span>
              <span className="font-bold">{assessment.brsrAvailability}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Audit Date:</span>
              <span className="font-bold">{assessment.assessmentDate}</span>
            </div>
          </div>

          {/* Pillar Scores Summary */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
              <span className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                Environmental (35)
              </span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {assessment.pillars.E.earnedScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-500">
                {assessment.pillars.E.percentage.toFixed(0)}% achievement
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20">
              <span className="text-[11px] font-bold uppercase text-teal-700 dark:text-teal-300">
                Social (35)
              </span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {assessment.pillars.S.earnedScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-500">
                {assessment.pillars.S.percentage.toFixed(0)}% achievement
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
              <span className="text-[11px] font-bold uppercase text-blue-700 dark:text-blue-300">
                Governance (30)
              </span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {assessment.pillars.G.earnedScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-500">
                {assessment.pillars.G.percentage.toFixed(0)}% achievement
              </span>
            </div>
          </div>

          {/* Indicator Itemization Table */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              11-Indicator Detailed Audit Breakdown
            </h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300">
                    <th className="p-2.5">Code</th>
                    <th className="p-2.5">Indicator Name</th>
                    <th className="p-2.5">Principle</th>
                    <th className="p-2.5 text-center">Score / 5</th>
                    <th className="p-2.5 text-center">Weight</th>
                    <th className="p-2.5 text-center">Weighted</th>
                    <th className="p-2.5">Verified BRSR Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {['E', 'S', 'G'].map((pKey) =>
                    assessment.pillars[pKey as 'E' | 'S' | 'G'].indicators.map((ind) => (
                      <tr key={ind.code}>
                        <td className="p-2.5 font-mono font-bold">{ind.code}</td>
                        <td className="p-2.5 font-medium">{ind.name}</td>
                        <td className="p-2.5 font-mono">{ind.brsrPrinciple}</td>
                        <td className="p-2.5 text-center font-bold text-emerald-600 dark:text-emerald-400">
                          {ind.rawScore.toFixed(1)}
                        </td>
                        <td className="p-2.5 text-center">{ind.weight}%</td>
                        <td className="p-2.5 text-center font-mono font-bold">
                          {ind.weightedScore.toFixed(2)}
                        </td>
                        <td className="p-2.5 text-slate-500 truncate max-w-xs">
                          {ind.evidence.sourceDocument} ({ind.evidence.questionRef})
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strengths & Improvement Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                Verified Strengths
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
                {assessment.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                Priority Focus Areas
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
                {assessment.improvementAreas.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Academic & Regulatory Attestation */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 leading-relaxed">
            <strong>Methodology Certification:</strong> Generated using the SEBI Business Responsibility and Sustainability Report (BRSR) 100-point scoring algorithm (35E : 35S : 30G). All scores represent mathematical synthesis of 4 evaluation dimensions (Disclosure, Policy, Performance, Assurance) evaluated against statutory filings.
          </div>
        </div>
      </div>
    </div>
  );
};
