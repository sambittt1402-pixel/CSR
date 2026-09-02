import React from 'react';
import { 
  ShieldCheck, 
  UploadCloud, 
  BarChart3, 
  Scale, 
  BookOpen, 
  Sparkles, 
  Printer,
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'assessment' | 'search' | 'compare' | 'framework' | 'methodology' | 'about';
  setCurrentTab: (tab: 'home' | 'assessment' | 'search' | 'compare' | 'framework' | 'methodology' | 'about') => void;
  onOpenAiModal: () => void;
  onOpenExportModal: () => void;
  companyName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAiModal,
  onOpenExportModal,
  companyName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white border-b border-[#334155] shadow-sm shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div 
            id="nav-logo" 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-emerald-500 p-1.5 rounded-md text-white shadow-xs group-hover:bg-emerald-400 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base sm:text-lg text-white">
                  BRSR ESG <span className="text-emerald-400 font-extrabold">Rating System</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700">
                  SEBI Mandate
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none">
                National Voluntary & SEBI Business Responsibility & Sustainability Reporting
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-medium">
            <button
              id="nav-tab-home"
              onClick={() => setCurrentTab('home')}
              className={`px-3 py-1.5 rounded transition-all ${
                currentTab === 'home'
                  ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              Home
            </button>
            <button
              id="nav-tab-search"
              onClick={() => setCurrentTab('search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                currentTab === 'search'
                  ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload BRSR Report
            </button>
            <button
              id="nav-tab-assessment"
              onClick={() => setCurrentTab('assessment')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
                currentTab === 'assessment'
                  ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Assessment
            </button>
            <button
              id="nav-tab-compare"
              onClick={() => setCurrentTab('compare')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
                currentTab === 'compare'
                  ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Compare
            </button>
            <button
              id="nav-tab-framework"
              onClick={() => setCurrentTab('framework')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
                currentTab === 'framework'
                  ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Framework
            </button>
            <button
              id="nav-tab-methodology"
              onClick={() => setCurrentTab('methodology')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
                currentTab === 'methodology'
                  ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Methodology
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              id="btn-ai-audit"
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded shadow-xs transition-all cursor-pointer"
              title="Audit or Evaluate using Gemini AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">AI Auditor</span>
              <span className="sm:hidden">AI</span>
            </button>

            <button
              id="btn-export-report-nav"
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded transition-colors cursor-pointer"
              title="Download or Print ESG Assessment"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
