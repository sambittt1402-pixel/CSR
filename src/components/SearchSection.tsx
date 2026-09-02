import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Building2, 
  ShieldCheck, 
  RotateCcw,
  FileCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { SAMPLE_BRSR_FILES, SampleBrsrFile } from '../services/sampleBrsrFiles';
import { 
  calculateBRSRFromFile, 
  calculateBRSRFromText, 
  calculateBRSRFromSample,
  CalculationResult 
} from '../services/brsrUploadService';
import { CompanyAssessment } from '../types';

interface SearchSectionProps {
  onSelectCompany: (companyId: string) => void;
  onCalculationComplete?: (assessment: CompanyAssessment) => void;
  onOpenAiAssessment?: () => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  onSelectCompany,
  onCalculationComplete,
  onOpenAiAssessment,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleBrsrFile | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [pastedText, setPastedText] = useState('');
  
  // Custom optional overrides
  const [customCompanyName, setCustomCompanyName] = useState('');
  const [customFiscalYear, setCustomFiscalYear] = useState('FY 2024–25');
  const [showMetadataInputs, setShowMetadataInputs] = useState(false);

  // Status & calculation states
  const [isDragging, setIsDragging] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationStep, setCalculationStep] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  // Core execution function that can be triggered automatically or manually
  const executeCalculation = async (params?: {
    file?: File | null;
    sample?: SampleBrsrFile | null;
    text?: string;
    overrideCompany?: string;
    overrideYear?: string;
  }) => {
    const fileToProcess = params?.file !== undefined ? params.file : selectedFile;
    const sampleToProcess = params?.sample !== undefined ? params.sample : selectedSample;
    const textToProcess = params?.text !== undefined ? params.text : pastedText;

    if (!fileToProcess && !sampleToProcess && !textToProcess.trim()) {
      setErrorMsg('Please upload a BRSR/ESG file, select a sample report, or paste disclosure text.');
      return;
    }

    setIsCalculating(true);
    setErrorMsg(null);
    setCalculationResult(null);

    try {
      setCalculationStep('Step 1/4: Reading document and parsing BRSR Sections A, B & C...');
      await new Promise((r) => setTimeout(r, 400));

      setCalculationStep('Step 2/4: Auditing statutory disclosures across NGRBC Principles 1–9...');
      await new Promise((r) => setTimeout(r, 450));

      setCalculationStep('Step 3/4: Calculating Environmental, Social & Governance pillar weights (35:35:30)...');
      await new Promise((r) => setTimeout(r, 400));

      let result: CalculationResult;

      if (fileToProcess) {
        result = await calculateBRSRFromFile(fileToProcess, {
          companyName: params?.overrideCompany || customCompanyName || undefined,
          fiscalYear: params?.overrideYear || customFiscalYear || undefined,
        });
      } else if (sampleToProcess) {
        result = await calculateBRSRFromSample(sampleToProcess);
      } else {
        result = await calculateBRSRFromText(textToProcess, {
          fileName: 'Pasted_BRSR_Text.txt',
          companyName: params?.overrideCompany || customCompanyName || undefined,
          fiscalYear: params?.overrideYear || customFiscalYear || undefined,
        });
      }

      setCalculationStep('Step 4/4: Finalizing 100-Point statutory scorecard & verbatim citations...');
      await new Promise((r) => setTimeout(r, 350));

      setCalculationResult(result);

      // Populate input boxes with the document-audited company name and year if not manually entered
      if (result.assessment?.companyName && !customCompanyName) {
        setCustomCompanyName(result.assessment.companyName);
      }
      if (result.assessment?.fiscalYear && !customFiscalYear) {
        setCustomFiscalYear(result.assessment.fiscalYear);
      }

      // Auto-update parent assessment state so it's instantly accessible everywhere
      if (onCalculationComplete) {
        onCalculationComplete(result.assessment);
      }

      // Smoothly scroll down to the result card so the user immediately sees the score
      setTimeout(() => {
        resultCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);

    } catch (err: any) {
      console.error('Calculation error:', err);
      setErrorMsg(err.message || 'Error occurred while calculating BRSR ESG score.');
    } finally {
      setIsCalculating(false);
      setCalculationStep('');
    }
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setSelectedSample(null);
    setErrorMsg(null);
    setCalculationResult(null);

    // If user explicitly typed a company name, respect it; otherwise let the auditor engine extract the true legal entity from the report
    const companyToUse = customCompanyName?.trim() || undefined;

    // AUTOMATICALLY calculate immediately when a file is uploaded!
    executeCalculation({ file, overrideCompany: companyToUse });
  };

  const handleSelectSample = (sample: SampleBrsrFile) => {
    setSelectedSample(sample);
    setSelectedFile(null);
    setPastedText(sample.textSnippet);
    setCustomCompanyName(sample.companyName);
    setCustomFiscalYear(sample.fiscalYear);
    setErrorMsg(null);
    setCalculationResult(null);

    // AUTOMATICALLY calculate immediately when a sample report is selected!
    executeCalculation({ sample, overrideCompany: sample.companyName, overrideYear: sample.fiscalYear });
  };

  const handleClear = () => {
    setSelectedFile(null);
    setSelectedSample(null);
    setPastedText('');
    setCalculationResult(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Run Manual Calculation (e.g. from pasted text or modified company name)
  const handleCalculateScore = async () => {
    executeCalculation();
  };

  const handleViewDetailedReport = () => {
    if (calculationResult && onCalculationComplete) {
      onCalculationComplete(calculationResult.assessment);
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-8 md:pt-8 md:pb-10 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Framework Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-3 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>STATUTORY SEBI BRSR FRAMEWORK • 100-POINT SCORING ENGINE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Measure Corporate Sustainability Through <span className="text-emerald-600 dark:text-emerald-400">BRSR</span>
        </h1>

        {/* Subheading */}
        <p className="mt-2 max-w-2xl mx-auto text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-normal leading-relaxed">
          Upload any Indian listed company&apos;s BRSR or ESG report to automatically extract disclosures, evaluate performance across Principles 1–9, and calculate its statutory ESG rating.
        </p>

        {/* Mode Toggle: File Upload vs Text Paste */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <div className="inline-flex p-0.5 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <button
              type="button"
              id="tab-mode-upload"
              onClick={() => setInputMode('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                inputMode === 'upload'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-gray-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload BRSR / ESG File</span>
            </button>
            <button
              type="button"
              id="tab-mode-paste"
              onClick={() => setInputMode('paste')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                inputMode === 'paste'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-gray-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Report Text</span>
            </button>
          </div>
        </div>

        {/* Main Interaction Container */}
        <div className="mt-4 max-w-2xl mx-auto text-left">
          
          {inputMode === 'upload' ? (
            /* DRAG & DROP FILE ZONE */
            <div
              id="brsr-dropzone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !selectedFile && fileInputRef.current?.click()}
              className={`relative rounded-xl border-2 border-dashed p-6 transition-all text-center cursor-pointer ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md'
                  : selectedFile
                  ? 'border-emerald-500/80 bg-white dark:bg-slate-800'
                  : 'border-gray-300 dark:border-slate-700 hover:border-emerald-500/70 bg-gray-50/70 dark:bg-slate-850'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                id="brsr-file-input"
                accept=".pdf,.txt,.csv,.json,.doc,.docx,.xlsx"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {isCalculating ? (
                /* ACTIVE COMPUTATION STATE */
                <div className="py-4 flex flex-col items-center justify-center text-center animate-fadeIn">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3 shadow-xs">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>AUTOMATIC STATUTORY AUDIT IN PROGRESS</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    Extracting BRSR Disclosures & Calculating ESG Score
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-1">
                    {calculationStep || 'Analyzing statutory document metrics...'}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full max-w-sm bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-3.5">
                    <div className="bg-emerald-600 h-full rounded-full animate-pulse transition-all duration-300 w-4/5" />
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2 font-mono truncate max-w-xs">
                    Auditing: {selectedFile ? selectedFile.name : selectedSample?.fileName || 'BRSR Report'}
                  </p>
                </div>
              ) : !selectedFile && !selectedSample ? (
                <div>
                  <div className="mx-auto w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Drop your BRSR or ESG report here to get instant result
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    Drag and drop or <span className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2">browse file</span> from your computer
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-[10px] text-gray-500 dark:text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 font-mono">PDF (.pdf)</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 font-mono">Text (.txt)</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 font-mono">Excel/CSV (.csv, .xlsx)</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 font-mono">Word (.docx)</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 font-mono">JSON</span>
                  </div>
                </div>
              ) : (
                /* SELECTED FILE PREVIEW */
                <div className="flex items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[280px] sm:max-w-md">
                          {selectedFile ? selectedFile.name : selectedSample?.fileName}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                          Audited & Evaluated
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-0.5">
                        {selectedFile
                          ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • ${selectedFile.type || 'BRSR Report File'}`
                          : `${selectedSample?.fileSize} • Pre-packaged Statutory BRSR Filing`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* DIRECT TEXT PASTE ZONE */
            <div className="rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Paste BRSR Section C or ESG Excerpt
              </label>
              <textarea
                id="brsr-text-input"
                rows={5}
                value={pastedText}
                onChange={(e) => {
                  setPastedText(e.target.value);
                  setSelectedFile(null);
                  setSelectedSample(null);
                  setErrorMsg(null);
                }}
                placeholder="Paste verbatim disclosures from BRSR Section C (e.g. Scope 1 & 2 GHG emissions, renewable energy percentage, LTIFR safety rate, CSR spend, POSH compliance, Board committees...)"
                className="w-full text-xs font-mono p-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400 mt-1">
                <span>{pastedText.length} characters entered</span>
                {pastedText && (
                  <button
                    type="button"
                    onClick={() => setPastedText('')}
                    className="text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Clear text
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Optional Metadata Toggle */}
          <div className="mt-2.5">
            <button
              type="button"
              onClick={() => setShowMetadataInputs(!showMetadataInputs)}
              className="text-[11px] font-semibold text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
            >
              <span>{showMetadataInputs ? '▾ Hide' : '▸ Optional:'} Custom Company Name & Fiscal Year</span>
            </button>

            {showMetadataInputs && (
              <div className="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Company Name (Auto-detected if blank)
                  </label>
                  <input
                    type="text"
                    value={customCompanyName}
                    onChange={(e) => setCustomCompanyName(e.target.value)}
                    placeholder="e.g. Reliance Industries Limited"
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Reporting Fiscal Year
                  </label>
                  <input
                    type="text"
                    value={customFiscalYear}
                    onChange={(e) => setCustomFiscalYear(e.target.value)}
                    placeholder="e.g. FY 2024–25"
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              id="btn-calculate-brsr"
              type="button"
              disabled={isCalculating || (!selectedFile && !selectedSample && !pastedText.trim())}
              onClick={handleCalculateScore}
              className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
                isCalculating || (!selectedFile && !selectedSample && !pastedText.trim())
                  ? 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20 hover:shadow-md'
              }`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{calculationStep || 'Calculating BRSR ESG Score...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Calculate BRSR Score from Uploaded Report</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {onOpenAiAssessment && (
              <button
                type="button"
                id="btn-open-ai-auditor"
                onClick={onOpenAiAssessment}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>AI Auditor Studio</span>
              </button>
            )}
          </div>

          {/* 1-Click Sample Reports to Test Instantly */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Or Test Instantly with Sample Official BRSR Reports:</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {SAMPLE_BRSR_FILES.map((sample) => {
                const isCurrent = selectedSample?.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    id={`btn-sample-${sample.id}`}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-gray-200 dark:border-slate-750 bg-white dark:bg-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 dark:text-slate-400">
                        <span>{sample.tickerNSE}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">BRSR</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                        {sample.shortName}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {sample.sector}
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-gray-100 dark:border-slate-700/60 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                      <span>Load & Calc</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CALCULATION RESULT CARD */}
          {calculationResult && (
            <div 
              id="calculation-result-card"
              ref={resultCardRef}
              className="mt-6 rounded-2xl border-2 border-emerald-400 dark:border-emerald-700 bg-white dark:bg-slate-900 p-4 sm:p-6 animate-fadeIn shadow-lg text-left"
            >
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-gray-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      STATUTORY AUDIT COMPLETE
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 font-mono">
                      {selectedFile ? `${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)` : selectedSample?.fileName || 'BRSR Report'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {calculationResult.assessment.companyName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {calculationResult.assessment.industry} • {calculationResult.assessment.fiscalYear}
                  </p>
                </div>

                {/* Score & Rating Badge */}
                <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-bold uppercase">BRSR ESG Score</span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono leading-none">
                      {calculationResult.assessment.overallScore.toFixed(1)}
                    </span>
                    <span className="text-xs font-normal text-gray-400"> / 100</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-black font-mono border shadow-xs ${
                      calculationResult.assessment.overallScore >= 80 
                        ? 'bg-emerald-600 text-white border-emerald-700' 
                        : 'bg-teal-600 text-white border-teal-700'
                    }`}>
                      {calculationResult.assessment.rating}
                    </span>
                    <span className="text-[9px] text-emerald-800 dark:text-emerald-300 font-bold mt-0.5">
                      {calculationResult.assessment.ratingInterpretation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar with Benchmark */}
              <div className="mt-3.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600 dark:text-slate-300 mb-1">
                  <span>Audited Score vs SEBI Top 1,000 Average (68.2)</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    {calculationResult.assessment.overallScore.toFixed(1)}%
                  </span>
                </div>
                <div className="relative w-full h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(0, calculationResult.assessment.overallScore))}%` }} 
                  />
                  {/* Benchmark tick at 68.2% */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10" 
                    style={{ left: '68.2%' }} 
                    title="SEBI Peer Benchmark: 68.2"
                  />
                </div>
              </div>

              {/* 3 Pillar Score Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                {/* Environmental */}
                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                    <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                      <span>🌿 Environmental</span>
                    </span>
                    <span className="font-mono font-extrabold text-blue-800 dark:text-blue-300">
                      {calculationResult.assessment.pillars.E.earnedScore.toFixed(1)} / 35
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-blue-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${(calculationResult.assessment.pillars.E.earnedScore / 35) * 100}%` }} 
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 dark:text-slate-400 flex flex-wrap gap-1 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-blue-100 dark:border-slate-600">GHG Scope 1-2</span>
                    <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-blue-100 dark:border-slate-600">Energy & Water</span>
                  </div>
                </div>

                {/* Social */}
                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-slate-800/80 border border-rose-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                    <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                      <span>🤝 Social</span>
                    </span>
                    <span className="font-mono font-extrabold text-rose-800 dark:text-rose-300">
                      {calculationResult.assessment.pillars.S.earnedScore.toFixed(1)} / 35
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-rose-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-600 rounded-full" 
                      style={{ width: `${(calculationResult.assessment.pillars.S.earnedScore / 35) * 100}%` }} 
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 dark:text-slate-400 flex flex-wrap gap-1 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-rose-100 dark:border-slate-600">Safety LTIFR</span>
                    <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-rose-100 dark:border-slate-600">2% CSR Spend</span>
                  </div>
                </div>

                {/* Governance */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                    <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                      <span>🏛️ Governance</span>
                    </span>
                    <span className="font-mono font-extrabold text-amber-800 dark:text-amber-300">
                      {calculationResult.assessment.pillars.G.earnedScore.toFixed(1)} / 30
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-amber-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-600 rounded-full" 
                      style={{ width: `${(calculationResult.assessment.pillars.G.earnedScore / 30) * 100}%` }} 
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 dark:text-slate-400 flex flex-wrap gap-1 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-amber-100 dark:border-slate-600">Anti-Corruption</span>
                    <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-amber-100 dark:border-slate-600">Board Oversight</span>
                  </div>
                </div>
              </div>

              {/* Key Audited Findings */}
              <div className="mt-3.5 p-3 rounded-xl bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 block mb-1">
                  Key Audited Disclosures from Document:
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  {calculationResult.assessment.strengths.slice(0, 2).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-2 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-750 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Upload Another Report</span>
                </button>

                <button
                  type="button"
                  id="btn-view-detailed-report"
                  onClick={handleViewDetailedReport}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow cursor-pointer"
                >
                  <span>Open Full Interactive Assessment & Dimension Breakdown</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
