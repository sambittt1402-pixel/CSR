export type PillarType = 'E' | 'S' | 'G';

export type MissingDataStatus = 
  | 'disclosed'
  | 'partially_disclosed'
  | 'not_disclosed'
  | 'not_applicable'
  | 'data_unavailable'
  | 'poor_performance';

export type RatingCode = 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B';

export interface RatingTier {
  min: number;
  max: number;
  rating: RatingCode;
  interpretation: string;
  badgeColor: string;
  description: string;
}

export interface DimensionScore {
  disclosure: number;      // 0 - 1.25
  policyTarget: number;    // 0 - 1.25
  actualPerformance: number; // 0 - 1.25
  assuranceProgress: number; // 0 - 1.25
}

export interface IndicatorEvidence {
  summary: string;
  verbatimExcerpt: string;
  sourceDocument: string;
  brsrPrinciple: string;
  brsrSection: string;
  questionRef: string;
  reportingYear: string;
}

export interface IndicatorAssessment {
  code: string;            // E1, E2, E3, E4, S1, S2, S3, S4, G1, G2, G3
  name: string;
  brsrPrinciple: string;   // P1, P2, P3, P4, P5, P6, P7, P8, P9
  pillar: PillarType;
  weight: number;          // e.g. 12, 8, 8, 7, 10, etc.
  rawScore: number;        // 0 to 5.0
  weightedScore: number;   // (rawScore / 5) * weight
  dimensions: DimensionScore;
  status: MissingDataStatus;
  statusExplanation?: string;
  evidence: IndicatorEvidence;
  assessmentRationale: string;
  aiSuggestedScore?: number;
  isOverridden?: boolean;
  manualNote?: string;
}

export interface PillarAssessment {
  pillar: PillarType;
  name: string;
  maxWeight: number;       // E=35, S=35, G=30
  earnedScore: number;
  percentage: number;
  indicators: IndicatorAssessment[];
}

export interface HistoricalYearScore {
  year: string;
  score: number;
  eScore: number;
  sScore: number;
  gScore: number;
  rating: RatingCode;
}

export interface CompanyAssessment {
  id: string;
  companyId: string;
  companyName: string;
  shortName?: string;
  tickerNSE: string;
  tickerBSE: string;
  industry: string;
  sector: string;
  marketCapTier: string;
  headquarters: string;
  fiscalYear: string;       // e.g. 'FY 2024–25'
  availableYears: string[];
  brsrAvailability: 'Disclosed & Audited' | 'Disclosed' | 'Partial' | 'Not Available';
  sustainabilityReportAvailability: 'Standalone ESG & BRSR' | 'Integrated in Annual Report' | 'BRSR Only' | 'None';
  assessmentDate: string;
  isDemonstration: boolean;
  verificationStatus: 'verified' | 'illustrative';
  overallScore: number;     // 0 - 100
  rating: RatingCode;
  ratingInterpretation: string;
  pillars: {
    E: PillarAssessment;
    S: PillarAssessment;
    G: PillarAssessment;
  };
  strengths: string[];
  improvementAreas: string[];
  historicalTrends: HistoricalYearScore[];
}

export interface CompanySummary {
  id: string;
  name: string;
  shortName: string;
  tickerNSE: string;
  tickerBSE: string;
  industry: string;
  sector: string;
  marketCapTier: string;
  latestYear: string;
  brsrAvailable: boolean;
  sustainabilityReportAvailable: boolean;
}

export interface BrsrPrincipleMeta {
  code: string;
  title: string;
  pillar: PillarType;
  description: string;
}

export const BRSR_PRINCIPLES: BrsrPrincipleMeta[] = [
  {
    code: 'P1',
    title: 'Integrity, Ethics & Transparency',
    pillar: 'G',
    description: 'Businesses should conduct and govern themselves with integrity, and in a manner that is ethical, transparent and accountable.',
  },
  {
    code: 'P2',
    title: 'Sustainable Goods & Services',
    pillar: 'E',
    description: 'Businesses should provide goods and services in a manner that is sustainable and safe across the product life cycle.',
  },
  {
    code: 'P3',
    title: 'Employee Well-being & Safety',
    pillar: 'S',
    description: 'Businesses should respect and promote the well-being of all employees, including those in their value chains.',
  },
  {
    code: 'P4',
    title: 'Stakeholder Engagement',
    pillar: 'S',
    description: 'Businesses should respect the interests of and be responsive to all their stakeholders, especially the vulnerable.',
  },
  {
    code: 'P5',
    title: 'Human Rights',
    pillar: 'S',
    description: 'Businesses should respect and promote human rights with zero tolerance for discrimination or forced labour.',
  },
  {
    code: 'P6',
    title: 'Environmental Protection & Climate Action',
    pillar: 'E',
    description: 'Businesses should respect and make efforts to protect and restore the environment, reducing GHG emissions and water stress.',
  },
  {
    code: 'P7',
    title: 'Responsible Public Policy Advocacy',
    pillar: 'G',
    description: 'Businesses, when engaging in influencing public and regulatory policy, should do so in a manner that is responsible and transparent.',
  },
  {
    code: 'P8',
    title: 'Inclusive Growth & Community Development',
    pillar: 'S',
    description: 'Businesses should promote inclusive growth and equitable development through high-impact CSR initiatives.',
  },
  {
    code: 'P9',
    title: 'Consumer Value & Trust',
    pillar: 'S',
    description: 'Businesses should engage with and provide value to their consumers in a responsible, secure and privacy-respecting manner.',
  },
];
