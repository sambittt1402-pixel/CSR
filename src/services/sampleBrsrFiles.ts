export interface SampleBrsrFile {
  id: string;
  companyName: string;
  shortName: string;
  tickerNSE: string;
  industry: string;
  sector: string;
  marketCapTier: string;
  fiscalYear: string;
  fileName: string;
  fileSize: string;
  description: string;
  textSnippet: string;
}

export const SAMPLE_BRSR_FILES: SampleBrsrFile[] = [
  {
    id: 'sample-reliance',
    companyName: 'Reliance Industries Limited (RIL)',
    shortName: 'Reliance Industries',
    tickerNSE: 'RELIANCE',
    industry: 'Oil & Gas, Petrochemicals, Telecom & Retail',
    sector: 'Energy & Conglomerate',
    marketCapTier: 'Large Cap (Nifty 50)',
    fiscalYear: 'FY 2024–25',
    fileName: 'Reliance_Industries_BRSR_Filing_FY25.pdf',
    fileSize: '3.4 MB',
    description: 'Statutory SEBI BRSR Section A, B & C filing with audited Scope 1/2 emissions, 2035 Net Zero plan, and 240 MW captive solar disclosures.',
    textSnippet: `BUSINESS RESPONSIBILITY & SUSTAINABILITY REPORT (BRSR)
SECTION A: GENERAL DISCLOSURES
Corporate Identity Number (CIN): L17110MH1973PLC019786
Name of the Company: Reliance Industries Limited
Registered Office: 3rd Floor, Maker Chambers IV, 222, Nariman Point, Mumbai 400 021, Maharashtra, India.
Reporting Boundary: Standalone and consolidated operations across refining, petrochemicals, retail and telecommunications.
Reporting Fiscal Year: FY 2024–25 (April 1, 2024 to March 31, 2025).

SECTION B: MANAGEMENT & PROCESS DISCLOSURES
Policy Framework: Environmental, Health & Safety (EHS) Policy, Human Rights Charter, Vigil Mechanism & Whistleblower Policy, Anti-Bribery Policy approved by the Board.
Board Committee: Risk Management and Sustainability Committee headed by Independent Director.
Assurance: Third-party reasonable assurance on Scope 1 and Scope 2 GHG inventory conducted by an independent global auditing firm.

SECTION C: PRINCIPLE-WISE PERFORMANCE DISCLOSURE
Principle 1 (Ethics, Transparency & Accountability):
- 100% of employees covered by Code of Conduct training.
- 0 substantiated anti-bribery or corruption complaints received during the fiscal year.
- Whistleblower mechanism functional with direct access to the Audit Committee Chairman.

Principle 2 (Sustainable Products & Circularity):
- Over 2.4 billion post-consumer PET bottles recycled into polyester staple fiber (R|Elan GreenGold).
- Extended Producer Responsibility (EPR) targets achieved across 100% of post-consumer plastic packaging obligations.
- Cradle-to-gate Life Cycle Assessments (LCA) completed for key polymers and purified terephthalic acid (PTA).

Principle 3 (Employee Well-being):
- Total permanent workforce: 389,000+ employees across retail, telecom, manufacturing.
- Lost Time Injury Frequency Rate (LTIFR): 0.14 per million person-hours worked.
- Zero reportable workforce fatalities recorded in manufacturing operations during FY 2024-25.
- Gender diversity: 21.4% female participation in workforce.
- 100% of eligible employees covered under comprehensive medical and accident insurance.

Principle 5 (Human Rights):
- POSH complaints received: 42; Resolved within statutory SEBI/Ministry timelines: 42 (100% resolution rate).
- Zero incidents of child labour, forced labour or involuntary servitude identified across value chain.

Principle 6 (Environmental Stewardship & Climate Action):
- Scope 1 GHG Emissions: 30.82 million metric tonnes CO2 equivalent (audited).
- Scope 2 GHG Emissions: 2.15 million metric tonnes CO2 equivalent (audited).
- Net Zero Target: Committed to becoming Net Carbon Zero across operations by 2035.
- Renewable Energy: 240 MW captive solar capacity commissioned; procurement of clean green power expanded by 18% YoY.
- Water Stewardship: Zero Liquid Discharge (ZLD) maintained at 92% of continuous manufacturing plants; 71.4 million m3 of water recycled and reused.
- Hazardous Waste: 98.7% of operational hazardous waste co-processed or recycled via authorized recyclers.

Principle 7 (Public Policy):
- Active participation in CII, FICCI and ASSOCHAM sustainability working groups with focus on green hydrogen regulations and circular economy frameworks.

Principle 8 (Inclusive Growth & CSR):
- Section 135 Mandatory CSR Expenditure: ₹1,271 Crore deployed through Reliance Foundation.
- Direct beneficiaries reached: 70+ million individuals across healthcare, disaster management, rural transformation, and women empowerment.

Principle 9 (Consumer Responsibility):
- Consumer grievance resolution rate exceeding 99.2% across telecom and retail services.
- Zero data privacy breaches or cybersecurity fines confirmed by regulatory authorities.`,
  },
  {
    id: 'sample-tatamotors',
    companyName: 'Tata Motors Limited',
    shortName: 'Tata Motors',
    tickerNSE: 'TATAMOTORS',
    industry: 'Automobile & Electric Vehicles',
    sector: 'Automotive',
    marketCapTier: 'Large Cap (Nifty 50)',
    fiscalYear: 'FY 2024–25',
    fileName: 'Tata_Motors_BRSR_Statutory_Report_FY25.pdf',
    fileSize: '4.1 MB',
    description: 'Official statutory disclosure detailing EV ecosystem expansion, RE100 manufacturing milestones, water positive facilities, and zero fatal accident benchmarks.',
    textSnippet: `TATA MOTORS LIMITED - BRSR STATUTORY FILING FY 2024–25
SECTION A: GENERAL DISCLOSURES
CIN: L28920MH1945PLC004520
Entity Name: Tata Motors Limited
Sector: Automotive Manufacturer (Commercial Vehicles, Passenger Electric Vehicles)
Headquarters: Bombay House, 24 Homi Mody Street, Mumbai 400 001.

SECTION B: GOVERNANCE & PROCESS
Board ESG Committee meets quarterly to evaluate climate transition, safety metrics and supply chain decarbonization.
Voluntary Commitments: Signatory to RE100 (100% renewable electricity by 2030) and Net Zero GHG emissions by 2045.

SECTION C: PERFORMANCE METRICS
Principle 6 (Environment):
- Scope 1 Emissions: 0.38 million tCO2e across India manufacturing plants.
- Scope 2 Emissions: 0.52 million tCO2e.
- Renewable electricity share reached 42% across Pune, Sanand, Pantnagar and Jamshedpur plants.
- Water Positive Status achieved at Pune and Sanand manufacturing campuses through rainwater harvesting and advanced RO recycling.
- Circularity: 94% of operational metallic and plastic waste diverted from landfills.

Principle 3 & 5 (Workplace Safety & Human Rights):
- LTIFR: 0.22 per million person-hours worked.
- 0 fatalities recorded during the reporting year.
- Women in shopfloor manufacturing roles expanded to 14.8% under the 'Women in Motion' initiative.
- POSH compliance: 18 complaints received, 18 resolved within statutory period.

Principle 8 (Community Development & CSR):
- CSR Investment: ₹28.5 Crore deployed in Affirmative Action (Aadyam), Kaushalya skill development, and Vidyadhanam scholarships for tribal students.

Principle 1 (Corporate Governance & Ethics):
- Tata Code of Conduct (TCOC) signed by 100% of executive and managerial staff.
- Third-party anti-bribery vigilance audits completed across 350 key tier-1 vendor partners.`,
  },
  {
    id: 'sample-infosys',
    companyName: 'Infosys Limited',
    shortName: 'Infosys',
    tickerNSE: 'INFY',
    industry: 'Information Technology & Software Services',
    sector: 'Technology',
    marketCapTier: 'Large Cap (Nifty 50)',
    fiscalYear: 'FY 2024–25',
    fileName: 'Infosys_BRSR_Comprehensive_Filing_FY25.pdf',
    fileSize: '2.8 MB',
    description: 'Gold-standard ESG filing detailing 5th consecutive year of operational Carbon Neutrality, 67% renewable energy, 39.8% women workforce, and Springboard CSR.',
    textSnippet: `INFOSYS LIMITED - BRSR DISCLOSURE STATEMENT FY 2024–25
SECTION A: GENERAL METRICS
CIN: L85110KA1981PLC013115
Company Name: Infosys Limited
Registered Office: Electronics City, Hosur Road, Bengaluru 560 100, Karnataka.
Industry: IT Consulting, Enterprise Cloud Services, Software Architecture.

SECTION B: SUSTAINABILITY GOVERNANCE
Executive Oversight: ESG Committee headed by Independent Directors with remuneration metrics tied to climate goals and female leadership representation.

SECTION C: STATUTORY PRINCIPLES
Principle 6 (Environment):
- Carbon Neutral for the 5th consecutive year across Scope 1, Scope 2 and business travel Scope 3 GHG emissions.
- Scope 1 Emissions: 0.021 million tCO2e. Scope 2 Emissions: 0.098 million tCO2e (market-based).
- Renewable Energy: 67.2% of total electricity consumed sourced from captive solar and wind PPA farms.
- 100% of campus wastewater treated and reused for cooling towers and landscaping; 35 captive sewage treatment plants operational.
- Zero Waste to Landfill (ZWL) certification maintained across all development centres in India.

Principle 3 (Employees):
- Total Employees: 317,000+.
- Gender Diversity: 39.8% women in total workforce; 24.1% women in senior managerial and leadership cadres.
- Occupational Health: LTIFR at 0.02 per million person-hours worked; 0 fatalities.
- Continuous Learning: Average of 46.2 training hours per employee logged via Lex learning platform.

Principle 8 (CSR & Digital Inclusion):
- Statutory CSR Spend: ₹392 Crore disbursed through Infosys Foundation.
- Infosys Springboard digital education portal trained over 6.5 million underprivileged students and job seekers across India.

Principle 1 & 9 (Governance, Data Privacy & Trust):
- Whistleblower hotline managed by independent ombudsman; 0 substantiated bribery allegations.
- ISO 27001 and SOC2 Type II certifications across 100% of global delivery centers. Zero data privacy breaches reported.`,
  },
  {
    id: 'sample-hdfcbank',
    companyName: 'HDFC Bank Limited',
    shortName: 'HDFC Bank',
    tickerNSE: 'HDFCBANK',
    industry: 'Banking & Financial Services',
    sector: 'Financials',
    marketCapTier: 'Large Cap (Nifty 50)',
    fiscalYear: 'FY 2024–25',
    fileName: 'HDFC_Bank_BRSR_Statutory_Report_FY25.pdf',
    fileSize: '3.1 MB',
    description: 'Statutory financial services BRSR filing showcasing ₹35,000+ Cr sustainable financing, Parivartan CSR impact across 9.9 Cr citizens, and digital governance.',
    textSnippet: `HDFC BANK LIMITED - SEBI BRSR REPORT FY 2024–25
SECTION A: ENTITY INFORMATION
CIN: L65920MH1994PLC080618
Entity: HDFC Bank Limited
Core Activities: Commercial Banking, Retail Finance, Treasury, MSME & Agri Lending.
Branch Network: 8,800+ banking outlets across all Indian states and union territories.

SECTION B: MANAGEMENT PROCESSES
Social and Environmental Management System (SEMS) integrated into wholesale corporate credit appraisals.
Statutory Committees: Board CSR and ESG Steering Committee, Audit Committee, Stakeholder Relationship Committee.

SECTION C: PERFORMANCE METRICS
Principle 6 (Environment & Sustainable Finance):
- Scope 1 & 2 Emissions: 0.28 million tCO2e across data centers and bank premises.
- Sustainable Lending Portfolio: ₹38,400 Crore deployed in renewable energy projects, electric mobility finance, and green certified infrastructure.
- 1,450 branches equipped with rooftop solar PV installations.
- Paperless banking adoption reached 94% across retail transactions through SmartHub Vyapar and Mobile Banking.

Principle 3 (Employees & Inclusion):
- Total Employees: 213,000+.
- Diversity: 24.8% female representation across urban and semi-urban branches.
- 0 fatalities recorded; comprehensive healthcare benefits provided to 100% of staff.

Principle 8 (Community Development):
- Section 135 Mandatory CSR: ₹945 Crore deployed under Project Parivartan.
- Total beneficiaries impacted: Over 9.9 Crore people in rural clusters, water conservation, and financial literacy programs.

Principle 1 & 9 (Ethics, Cyber Defense & Customer Grievances):
- Code of Conduct training completed by 100% of active personnel.
- 24/7 Security Operations Center (SOC); zero material cybersecurity incidents impacting customer funds.
- Customer grievance redressal rate of 99.4% within RBI mandated timelines.`,
  },
  {
    id: 'sample-mahindra',
    companyName: 'Mahindra & Mahindra Limited',
    shortName: 'Mahindra & Mahindra',
    tickerNSE: 'M&M',
    industry: 'Automotive & Farm Equipment',
    sector: 'Automotive',
    marketCapTier: 'Large Cap (Nifty 50)',
    fiscalYear: 'FY 2024–25',
    fileName: 'Mahindra_BRSR_ESG_Filing_FY25.pdf',
    fileSize: '3.6 MB',
    description: 'Comprehensive BRSR filing detailing EP100 doubling of energy productivity, Zero Waste to Landfill across 14 plants, and Nanhi Kali girl child CSR.',
    textSnippet: `MAHINDRA & MAHINDRA LIMITED - BRSR DISCLOSURE FY 2024–25
SECTION A: GENERAL REPORTING
CIN: L65990MH1945PLC004558
Company: Mahindra & Mahindra Limited
Headquarters: Gateway Building, Apollo Bunder, Mumbai 400 001.
Core Divisions: Automotive (SUVs, Commercial Vehicles) and Farm Equipment (Tractors).

SECTION B: STRATEGY & OVERSIGHT
Global Commitments: First Indian company to commit to EP100 (doubling energy productivity) and Science Based Targets initiative (SBTi 1.5°C pathway).

SECTION C: PRINCIPLE METRICS
Principle 6 (Environment):
- Scope 1 Emissions: 0.19 million tCO2e. Scope 2 Emissions: 0.26 million tCO2e.
- Energy Productivity doubled 12 years ahead of target under global EP100 pledge.
- Renewable Energy: 46% of manufacturing electricity derived from solar and wind installations.
- 14 manufacturing plants certified as Zero Waste to Landfill (ZWL) with over 99% waste diversion.
- Water Positive across all tractor and automotive production plants through Hariyali rainwater harvesting.

Principle 3 (Workforce):
- LTIFR recorded at 0.18 per million person-hours worked; zero industrial fatalities.
- 28.4 hours of technical and EHS training per employee per annum.

Principle 8 (Inclusive Growth):
- Project Nanhi Kali provided educational support to over 210,000 underprivileged girl children.
- Watershed development projects created over 18 billion litres of water harvesting potential in drought-prone districts of Maharashtra and Madhya Pradesh.

Principle 1 (Ethics):
- Zero tolerance for corruption; all vendors mandated to sign Business Partner Code of Conduct.`,
  },
];
