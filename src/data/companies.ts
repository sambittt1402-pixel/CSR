import { CompanyAssessment, CompanySummary } from '../types';
import { RELIANCE_ASSESSMENT_FY25 } from './relianceData';
import { TATA_MOTORS_ASSESSMENT_FY25, INFOSYS_ASSESSMENT_FY25 } from './otherCompaniesData';
import { ITC_ASSESSMENT_FY25, HDFC_BANK_ASSESSMENT_FY25, LARSEN_TOUBRO_ASSESSMENT_FY25 } from './moreCompaniesData';
import { recalculateOverallAssessment } from '../services/scoringEngine';

export const ALL_COMPANIES_SUMMARY: CompanySummary[] = [
  {
    id: 'reliance',
    name: 'Reliance Industries Limited (RIL)',
    shortName: 'Reliance Industries',
    tickerNSE: 'RELIANCE',
    tickerBSE: '500325',
    industry: 'Oil & Gas, Petrochemicals, Telecom & Retail',
    sector: 'Energy & Conglomerate',
    marketCapTier: 'Large Cap (Nifty 50)',
    latestYear: 'FY 2024–25',
    brsrAvailable: true,
    sustainabilityReportAvailable: true,
  },
  {
    id: 'tatamotors',
    name: 'Tata Motors Limited',
    shortName: 'Tata Motors',
    tickerNSE: 'TATAMOTORS',
    tickerBSE: '500570',
    industry: 'Automobile & Electric Vehicles',
    sector: 'Automotive',
    marketCapTier: 'Large Cap (Nifty 50)',
    latestYear: 'FY 2024–25',
    brsrAvailable: true,
    sustainabilityReportAvailable: true,
  },
  {
    id: 'infosys',
    name: 'Infosys Limited',
    shortName: 'Infosys',
    tickerNSE: 'INFY',
    tickerBSE: '500209',
    industry: 'Information Technology & Software Services',
    sector: 'Technology',
    marketCapTier: 'Large Cap (Nifty 50)',
    latestYear: 'FY 2024–25',
    brsrAvailable: true,
    sustainabilityReportAvailable: true,
  },
  {
    id: 'itc',
    name: 'ITC Limited',
    shortName: 'ITC',
    tickerNSE: 'ITC',
    tickerBSE: '500875',
    industry: 'FMCG, Paperboards, Hotels & Agri-Business',
    sector: 'Diversified Consumer Goods',
    marketCapTier: 'Large Cap (Nifty 50)',
    latestYear: 'FY 2024–25',
    brsrAvailable: true,
    sustainabilityReportAvailable: true,
  },
  {
    id: 'hdfcbank',
    name: 'HDFC Bank Limited',
    shortName: 'HDFC Bank',
    tickerNSE: 'HDFCBANK',
    tickerBSE: '500180',
    industry: 'Banking & Financial Services',
    sector: 'Financials',
    marketCapTier: 'Large Cap (Nifty 50)',
    latestYear: 'FY 2024–25',
    brsrAvailable: true,
    sustainabilityReportAvailable: true,
  },
  {
    id: 'lt',
    name: 'Larsen & Toubro Limited (L&T)',
    shortName: 'Larsen & Toubro',
    tickerNSE: 'LT',
    tickerBSE: '500510',
    industry: 'Engineering, Procurement & Construction (EPC)',
    sector: 'Capital Goods & Infrastructure',
    marketCapTier: 'Large Cap (Nifty 50)',
    latestYear: 'FY 2024–25',
    brsrAvailable: true,
    sustainabilityReportAvailable: true,
  },
];

const ASSESSMENTS_MAP: Record<string, CompanyAssessment> = {
  reliance: RELIANCE_ASSESSMENT_FY25,
  tatamotors: TATA_MOTORS_ASSESSMENT_FY25,
  infosys: INFOSYS_ASSESSMENT_FY25,
  itc: ITC_ASSESSMENT_FY25,
  hdfcbank: HDFC_BANK_ASSESSMENT_FY25,
  lt: LARSEN_TOUBRO_ASSESSMENT_FY25,
};

export function getCompanyAssessment(companyId: string, fiscalYear: string = 'FY 2024–25'): CompanyAssessment {
  const base = ASSESSMENTS_MAP[companyId] || RELIANCE_ASSESSMENT_FY25;
  if (fiscalYear === 'FY 2024–25') {
    return JSON.parse(JSON.stringify(base));
  }

  // Generate historic year assessment based on trend offset
  const historic = JSON.parse(JSON.stringify(base)) as CompanyAssessment;
  historic.fiscalYear = fiscalYear;

  const trend = historic.historicalTrends.find((t) => t.year === fiscalYear);
  const factor = trend ? trend.score / base.overallScore : fiscalYear === 'FY 2023–24' ? 0.95 : 0.90;

  // Scale indicators proportionally
  ['E', 'S', 'G'].forEach((pKey) => {
    const pillar = historic.pillars[pKey as 'E' | 'S' | 'G'];
    pillar.indicators.forEach((ind) => {
      ind.rawScore = Number(Math.max(1.0, Math.min(5.0, ind.rawScore * factor)).toFixed(2));
      const perDim = Number((ind.rawScore / 4).toFixed(2));
      ind.dimensions = {
        disclosure: perDim,
        policyTarget: perDim,
        actualPerformance: perDim,
        assuranceProgress: Number((ind.rawScore - perDim * 3).toFixed(2)),
      };
      ind.evidence.reportingYear = fiscalYear;
    });
  });

  return recalculateOverallAssessment(historic);
}

export function searchCompanies(query: string): CompanySummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_COMPANIES_SUMMARY;
  return ALL_COMPANIES_SUMMARY.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.tickerNSE.toLowerCase().includes(q) ||
      c.tickerBSE.includes(q) ||
      c.industry.toLowerCase().includes(q)
  );
}
