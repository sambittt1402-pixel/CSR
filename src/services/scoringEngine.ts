import {
  DimensionScore,
  IndicatorAssessment,
  PillarAssessment,
  CompanyAssessment,
  RatingCode,
  RatingTier,
  MissingDataStatus,
} from '../types';

export const RATING_SCALE: RatingTier[] = [
  {
    min: 90,
    max: 100,
    rating: 'AAA',
    interpretation: 'Outstanding',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    description: 'Pioneering ESG posture with sector-leading disclosures, aggressive audited net-zero/circular milestones, and stringent governance oversight.',
  },
  {
    min: 80,
    max: 89.99,
    rating: 'AA',
    interpretation: 'Strong',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    description: 'Comprehensive BRSR disclosures across core principles with established targets, verified emissions, and sound governance policies.',
  },
  {
    min: 70,
    max: 79.99,
    rating: 'A',
    interpretation: 'Good',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    description: 'Adequate compliance with core SEBI mandates, measurable progress on key operational metrics, and proactive community/workforce investments.',
  },
  {
    min: 60,
    max: 69.99,
    rating: 'BBB',
    interpretation: 'Adequate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    description: 'Baseline compliance meeting standard statutory requirements; opportunities exist to improve value-chain Scope 3 and circular disclosures.',
  },
  {
    min: 50,
    max: 59.99,
    rating: 'BB',
    interpretation: 'Weak',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
    description: 'Notable gaps in key BRSR disclosures, minimal quantified targets or lack of third-party reasonable assurance on environmental metrics.',
  },
  {
    min: 0,
    max: 49.99,
    rating: 'B',
    interpretation: 'Poor',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    description: 'Critical disclosure omissions, lack of transparent policies or severe regulatory penalties impacting long-term enterprise sustainability.',
  },
];

export function getRatingFromScore(score: number): { rating: RatingCode; interpretation: string; tier: RatingTier } {
  const clamped = Math.max(0, Math.min(100, score));
  const tier = RATING_SCALE.find((t) => clamped >= t.min && clamped <= t.max) || RATING_SCALE[RATING_SCALE.length - 1];
  return {
    rating: tier.rating,
    interpretation: tier.interpretation,
    tier,
  };
}

export function calculateWeightedScore(rawScore: number, weight: number): number {
  const clamped = Math.max(0, Math.min(5, rawScore));
  const weighted = (clamped / 5) * weight;
  return Number(weighted.toFixed(2));
}

export function calculateDimensionRawScore(dimensions: DimensionScore): number {
  const d = Math.max(0, Math.min(1.25, dimensions.disclosure));
  const p = Math.max(0, Math.min(1.25, dimensions.policyTarget));
  const a = Math.max(0, Math.min(1.25, dimensions.actualPerformance));
  const ap = Math.max(0, Math.min(1.25, dimensions.assuranceProgress));
  return Number((d + p + a + ap).toFixed(2));
}

export function recalculatePillar(
  pillarKey: 'E' | 'S' | 'G',
  pillarName: string,
  maxWeight: number,
  indicators: IndicatorAssessment[]
): PillarAssessment {
  const updatedIndicators = indicators.map((ind) => {
    // If dimension scores exist, calculate rawScore from dimensions
    const computedRaw = calculateDimensionRawScore(ind.dimensions);
    const rawScore = ind.rawScore !== undefined ? ind.rawScore : computedRaw;
    const weightedScore = calculateWeightedScore(rawScore, ind.weight);
    return {
      ...ind,
      rawScore,
      weightedScore,
    };
  });

  const earnedScore = Number(
    updatedIndicators.reduce((sum, ind) => sum + ind.weightedScore, 0).toFixed(2)
  );
  const percentage = Number(((earnedScore / maxWeight) * 100).toFixed(1));

  return {
    pillar: pillarKey,
    name: pillarName,
    maxWeight,
    earnedScore,
    percentage,
    indicators: updatedIndicators,
  };
}

export function recalculateOverallAssessment(assessment: CompanyAssessment): CompanyAssessment {
  const pillarE = recalculatePillar('E', 'Environmental', 35, assessment.pillars.E.indicators);
  const pillarS = recalculatePillar('S', 'Social', 35, assessment.pillars.S.indicators);
  const pillarG = recalculatePillar('G', 'Governance', 30, assessment.pillars.G.indicators);

  const totalScore = Number((pillarE.earnedScore + pillarS.earnedScore + pillarG.earnedScore).toFixed(1));
  const { rating, interpretation } = getRatingFromScore(totalScore);

  const allIndicators = [
    ...pillarE.indicators,
    ...pillarS.indicators,
    ...pillarG.indicators,
  ];

  const { strengths, improvementAreas } = identifyStrengthsAndImprovementAreas(allIndicators);

  return {
    ...assessment,
    overallScore: totalScore,
    rating,
    ratingInterpretation: interpretation,
    pillars: {
      E: pillarE,
      S: pillarS,
      G: pillarG,
    },
    strengths,
    improvementAreas,
  };
}

export function identifyStrengthsAndImprovementAreas(indicators: IndicatorAssessment[]): {
  strengths: string[];
  improvementAreas: string[];
} {
  // Sort by ratio of rawScore / 5
  const sorted = [...indicators].sort((a, b) => b.rawScore - a.rawScore);

  const strengths = sorted
    .filter((ind) => ind.rawScore >= 4.0)
    .slice(0, 4)
    .map((ind) => `${ind.name} (${ind.code}): Scored ${ind.rawScore.toFixed(1)}/5 — ${ind.assessmentRationale.slice(0, 110)}...`);

  if (strengths.length === 0) {
    strengths.push('Baseline statutory compliance maintained across SEBI core principles.');
  }

  const improvementAreas = sorted
    .filter((ind) => ind.rawScore < 4.2)
    .reverse()
    .slice(0, 4)
    .map((ind) => `${ind.name} (${ind.code}): Scored ${ind.rawScore.toFixed(1)}/5 — Opportunity to enhance disclosures and targets.`);

  if (improvementAreas.length === 0) {
    improvementAreas.push('Expand third-party reasonable assurance across value-chain Scope 3 greenhouse gas disclosures.');
  }

  return { strengths, improvementAreas };
}

export function updateIndicatorScore(
  assessment: CompanyAssessment,
  indicatorCode: string,
  newRawScore: number,
  manualNote?: string
): CompanyAssessment {
  const cloned = JSON.parse(JSON.stringify(assessment)) as CompanyAssessment;

  const targetPillar = indicatorCode.startsWith('E')
    ? cloned.pillars.E
    : indicatorCode.startsWith('S')
    ? cloned.pillars.S
    : cloned.pillars.G;

  const ind = targetPillar.indicators.find((i) => i.code === indicatorCode);
  if (ind) {
    ind.rawScore = Number(Math.max(0, Math.min(5, newRawScore)).toFixed(2));
    ind.weightedScore = calculateWeightedScore(ind.rawScore, ind.weight);
    ind.isOverridden = true;
    if (manualNote !== undefined) {
      ind.manualNote = manualNote;
    }
    // Proportionally distribute new score across the 4 dimensions
    const perDim = Number((ind.rawScore / 4).toFixed(2));
    ind.dimensions = {
      disclosure: perDim,
      policyTarget: perDim,
      actualPerformance: perDim,
      assuranceProgress: Number((ind.rawScore - perDim * 3).toFixed(2)),
    };
  }

  return recalculateOverallAssessment(cloned);
}

export function resetIndicatorToAISuggestion(
  assessment: CompanyAssessment,
  indicatorCode: string
): CompanyAssessment {
  const cloned = JSON.parse(JSON.stringify(assessment)) as CompanyAssessment;
  const targetPillar = indicatorCode.startsWith('E')
    ? cloned.pillars.E
    : indicatorCode.startsWith('S')
    ? cloned.pillars.S
    : cloned.pillars.G;

  const ind = targetPillar.indicators.find((i) => i.code === indicatorCode);
  if (ind && ind.aiSuggestedScore !== undefined) {
    ind.rawScore = ind.aiSuggestedScore;
    ind.weightedScore = calculateWeightedScore(ind.rawScore, ind.weight);
    ind.isOverridden = false;
    ind.manualNote = undefined;
    const perDim = Number((ind.rawScore / 4).toFixed(2));
    ind.dimensions = {
      disclosure: perDim,
      policyTarget: perDim,
      actualPerformance: perDim,
      assuranceProgress: Number((ind.rawScore - perDim * 3).toFixed(2)),
    };
  }

  return recalculateOverallAssessment(cloned);
}

export const overrideIndicatorScore = updateIndicatorScore;
export const resetIndicatorOverride = resetIndicatorToAISuggestion;

export function getStatusBadge(status: MissingDataStatus): { label: string; color: string } {
  switch (status) {
    case 'disclosed':
      return { label: 'Disclosed & Verified', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' };
    case 'partially_disclosed':
      return { label: 'Partially Disclosed', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' };
    case 'not_disclosed':
      return { label: 'Not Disclosed', color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800' };
    case 'not_applicable':
      return { label: 'Not Applicable', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' };
    case 'data_unavailable':
      return { label: 'Data Unavailable', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' };
    case 'poor_performance':
      return { label: 'Poor Performance', color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800' };
  }
}
