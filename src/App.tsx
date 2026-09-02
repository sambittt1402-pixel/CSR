import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchSection } from './components/SearchSection';
import { CompanyProfileHeader } from './components/CompanyProfileHeader';
import { ScoreOverviewCards } from './components/ScoreOverviewCards';
import { VisualDashboard } from './components/VisualDashboard';
import { IndicatorScoreTable } from './components/IndicatorScoreTable';
import { IndicatorDetailModal } from './components/IndicatorDetailModal';
import { CompanyComparisonView } from './components/CompanyComparisonView';
import { FrameworkView } from './components/FrameworkView';
import { MethodologyView } from './components/MethodologyView';
import { AboutView } from './components/AboutView';
import { AIAssessmentModal } from './components/AIAssessmentModal';
import { ReportExportModal } from './components/ReportExportModal';

import { getCompanyAssessment, ALL_COMPANIES_SUMMARY } from './data/companies';
import { CompanyAssessment, IndicatorAssessment } from './types';
import { 
  overrideIndicatorScore, 
  resetIndicatorOverride, 
  recalculateOverallAssessment 
} from './services/scoringEngine';
import { 
  ArrowRight, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  BookOpen,
  Scale,
  CheckCircle2
} from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<
    'home' | 'assessment' | 'search' | 'compare' | 'framework' | 'methodology' | 'about'
  >('home');

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('reliance');
  const [selectedFiscalYear, setSelectedFiscalYear] = useState<string>('FY 2024–25');
  const [currentAssessment, setCurrentAssessment] = useState<CompanyAssessment>(() =>
    getCompanyAssessment('reliance', 'FY 2024–25')
  );

  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorAssessment | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isOverridden, setIsOverridden] = useState<boolean>(false);

  // Sync assessment when company or year changes
  useEffect(() => {
    if (!selectedCompanyId.startsWith('upload-') && !selectedCompanyId.startsWith('uploaded-')) {
      const loaded = getCompanyAssessment(selectedCompanyId, selectedFiscalYear);
      setCurrentAssessment(loaded);
      setIsOverridden(false);
    }
  }, [selectedCompanyId, selectedFiscalYear]);

  // Handler when a user uploads and calculates BRSR ESG score
  const handleCalculationComplete = (assessment: CompanyAssessment) => {
    setCurrentAssessment(assessment);
    setSelectedCompanyId(assessment.companyId);
    setSelectedFiscalYear(assessment.fiscalYear);
    setCurrentTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for selecting a company from home / search
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setSelectedFiscalYear('FY 2024–25');
    setCurrentTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for reporting year toggle
  const handleYearChange = (year: string) => {
    setSelectedFiscalYear(year);
  };

  // Handler for indicator score manual override (Section 24)
  const handleSaveOverride = (code: string, newScore: number) => {
    const updated = overrideIndicatorScore(currentAssessment, code, newScore);
    setCurrentAssessment(updated);
    setIsOverridden(true);
    // Keep modal open with updated object
    const pKey = code.startsWith('E') ? 'E' : code.startsWith('S') ? 'S' : 'G';
    const refreshed = updated.pillars[pKey].indicators.find((i) => i.code === code);
    if (refreshed) {
      setSelectedIndicator(refreshed);
    }
  };

  // Handler to reset a single override
  const handleResetOverride = (code: string) => {
    const updated = resetIndicatorOverride(currentAssessment, code);
    setCurrentAssessment(updated);
    const pKey = code.startsWith('E') ? 'E' : code.startsWith('S') ? 'S' : 'G';
    const refreshed = updated.pillars[pKey].indicators.find((i) => i.code === code);
    if (refreshed) {
      setSelectedIndicator(refreshed);
    }
  };

  // Reset all overrides back to clean data
  const handleResetAllOverrides = () => {
    const clean = getCompanyAssessment(selectedCompanyId, selectedFiscalYear);
    setCurrentAssessment(clean);
    setIsOverridden(false);
  };

  // Handler to apply AI-generated evaluation from Gemini
  const handleApplyAiEvaluation = (updatedIndicators: any[], summaryText: string) => {
    const clone = JSON.parse(JSON.stringify(currentAssessment)) as CompanyAssessment;

    updatedIndicators.forEach((aiInd) => {
      const pKey = aiInd.code.startsWith('E')
        ? 'E'
        : aiInd.code.startsWith('S')
        ? 'S'
        : 'G';
      const target = clone.pillars[pKey as 'E' | 'S' | 'G'].indicators.find(
        (i) => i.code === aiInd.code
      );
      if (target) {
        target.rawScore = Number(aiInd.score.toFixed(2));
        target.aiSuggestedScore = Number(aiInd.score.toFixed(2));
        if (aiInd.dimensions) {
          target.dimensions = {
            disclosure: Number(aiInd.dimensions.disclosure.toFixed(2)),
            policyTarget: Number(aiInd.dimensions.policyTarget.toFixed(2)),
            actualPerformance: Number(aiInd.dimensions.actualPerformance.toFixed(2)),
            assuranceProgress: Number(aiInd.dimensions.assuranceProgress.toFixed(2)),
          };
        }
        if (aiInd.evidenceSummary) {
          target.evidence.summary = aiInd.evidenceSummary;
        }
        if (aiInd.assessmentRationale) {
          target.assessmentRationale = aiInd.assessmentRationale;
        }
      }
    });

    const recalculated = recalculateOverallAssessment(clone);
    setCurrentAssessment(recalculated);
    setIsOverridden(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-slate-900 text-[#1F2937] dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        companyName={currentAssessment.companyName}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* VIEW: Home & Landing */}
        {currentTab === 'home' && (
          <div className="animate-fadeIn">
            <SearchSection
              onSelectCompany={handleSelectCompany}
              onCalculationComplete={handleCalculationComplete}
              onOpenAiAssessment={() => setIsAiModalOpen(true)}
            />

            {/* Featured Corporate Assessments Grid (Section 1 & 2) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Statutory Filing Repository
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    Featured Indian Listed Enterprises
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Explore verified FY 2024–25 BRSR sustainability ratings across key sectors.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentTab('compare')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare All Companies</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_COMPANIES_SUMMARY.map((comp) => {
                  const assess = getCompanyAssessment(comp.id);
                  return (
                    <div
                      key={comp.id}
                      id={`featured-card-${comp.id}`}
                      onClick={() => handleSelectCompany(comp.id)}
                      className="bg-white dark:bg-slate-850 rounded-xl p-4 border border-gray-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-750 text-gray-700 dark:text-slate-300">
                            NSE: {comp.tickerNSE}
                          </span>
                          <span className="text-[10px] font-extrabold font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            Rating: {assess.rating}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {comp.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1">
                          {comp.industry}
                        </p>

                        {/* Quick Pillar Scores */}
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                          <div className="p-1.5 rounded-lg bg-blue-50/50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
                            <span className="text-[9px] text-gray-400 block font-semibold">Env (35)</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {assess.pillars.E.earnedScore.toFixed(1)}
                            </span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-rose-50/50 dark:bg-slate-800 border border-rose-100 dark:border-slate-700">
                            <span className="text-[9px] text-gray-400 block font-semibold">Soc (35)</span>
                            <span className="font-bold text-rose-600 dark:text-rose-400">
                              {assess.pillars.S.earnedScore.toFixed(1)}
                            </span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-amber-50/50 dark:bg-slate-800 border border-amber-100 dark:border-slate-700">
                            <span className="text-[9px] text-gray-400 block font-semibold">Gov (30)</span>
                            <span className="font-bold text-amber-600 dark:text-amber-400">
                              {assess.pillars.G.earnedScore.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-black text-slate-900 dark:text-white text-sm font-mono">
                          {assess.overallScore.toFixed(1)} <span className="text-[10px] font-normal text-gray-400">/ 100</span>
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                          <span>Inspect Report</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* VIEW: Search / Upload Tab */}
        {currentTab === 'search' && (
          <div className="animate-fadeIn py-4">
            <SearchSection
              onSelectCompany={handleSelectCompany}
              onCalculationComplete={handleCalculationComplete}
              onOpenAiAssessment={() => setIsAiModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW: Company Assessment Dashboard (Main Core View) */}
        {currentTab === 'assessment' && (
          <div className="animate-fadeIn">
            {/* Notification Banner for Uploaded File Audit */}
            {currentAssessment.companyId.startsWith('upload') && (
              <div className="bg-emerald-700 text-white px-4 py-2.5 shadow-sm text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                  <span>
                    Audit Result Generated: Successfully calculated statutory BRSR ESG rating for <strong>{currentAssessment.companyName}</strong> ({currentAssessment.fiscalYear}) from your uploaded report! Total Score: <strong>{currentAssessment.overallScore.toFixed(1)} / 100 ({currentAssessment.rating})</strong>
                  </span>
                </div>
                <button
                  onClick={() => setCurrentTab('search')}
                  className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold cursor-pointer transition-colors shrink-0"
                >
                  Upload Another Report
                </button>
              </div>
            )}

            {/* 1. Header Profile & FY Selector */}
            <CompanyProfileHeader
              assessment={currentAssessment}
              onYearChange={handleYearChange}
              onOpenAiAudit={() => setIsAiModalOpen(true)}
              onOpenCompare={() => setCurrentTab('compare')}
              onOpenExport={() => setIsExportModalOpen(true)}
              isOverridden={isOverridden}
              onResetAllOverrides={handleResetAllOverrides}
            />

            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 space-y-4">
              {/* 2. Score Overview Cards & Gauge */}
              <ScoreOverviewCards assessment={currentAssessment} />

              {/* 3. Visual Charts & Strengths/Improvement Panels */}
              <VisualDashboard assessment={currentAssessment} />

              {/* 4. Comprehensive Indicator Score Table */}
              <IndicatorScoreTable
                assessment={currentAssessment}
                onSelectIndicator={(ind) => setSelectedIndicator(ind)}
                onQuickOverride={(code, score) => handleSaveOverride(code, score)}
              />
            </div>
          </div>
        )}

        {/* VIEW: Compare Companies */}
        {currentTab === 'compare' && (
          <CompanyComparisonView
            initialCompanyId={selectedCompanyId}
            onViewCompany={handleSelectCompany}
          />
        )}

        {/* VIEW: Framework */}
        {currentTab === 'framework' && <FrameworkView />}

        {/* VIEW: Methodology */}
        {currentTab === 'methodology' && <MethodologyView />}

        {/* VIEW: About */}
        {currentTab === 'about' && <AboutView />}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-3 text-[11px] text-gray-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              BRSR ESG Rating System
            </span>
            <span>•</span>
            <span>SEBI Mandated Indian Corporate Sustainability Framework</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-gray-500 dark:text-slate-400">
            <button onClick={() => setCurrentTab('framework')} className="hover:text-emerald-600">
              9 NGRBC Principles
            </button>
            <button onClick={() => setCurrentTab('methodology')} className="hover:text-emerald-600">
              35:35:30 Methodology
            </button>
            <button onClick={() => setCurrentTab('about')} className="hover:text-emerald-600">
              Methodology Docs
            </button>
          </div>
        </div>
      </footer>

      {/* Modal: Detailed Indicator Panel & Manual Override */}
      <IndicatorDetailModal
        indicator={selectedIndicator}
        onClose={() => setSelectedIndicator(null)}
        onSaveOverride={handleSaveOverride}
        onResetOverride={handleResetOverride}
      />

      {/* Modal: AI BRSR Auditor */}
      <AIAssessmentModal
        currentAssessment={currentAssessment}
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyAiEvaluation={handleApplyAiEvaluation}
      />

      {/* Modal: Report Export (Print & CSV) */}
      <ReportExportModal
        assessment={currentAssessment}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
export default App;
