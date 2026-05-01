// Realistic Salesforce-shaped mock data used by all variants
export interface AccountMock {
  name: string;
  industry: string;
  annualRevenue: string;
  healthScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  owner: string;
  type: string;
  employees: number;
  hqCity: string;
  renewalDate: string;
  lastTouch: string;
}

export interface OpportunityMock {
  name: string;
  stage: string;
  amount: string;
  closeDate: string;
  probability: number;
  owner: string;
}

export interface ContactMock {
  name: string;
  title: string;
  email: string;
  phone: string;
  influence: 'Champion' | 'Decision Maker' | 'Influencer' | 'Detractor';
}

export interface CaseMock {
  caseNumber: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: string;
  ageDays: number;
}

export interface RiskSignal {
  label: string;
  severity: 'info' | 'warning' | 'error';
  detail: string;
}

export interface NextBestAction {
  title: string;
  rationale: string;
  ctaLabel: string;
}

export interface ActivityItem {
  type: 'email' | 'call' | 'meeting' | 'note';
  subject: string;
  who: string;
  when: string;
}

export interface KpiMetric {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
}

export interface AccountIntelligenceMock {
  account: AccountMock;
  opportunities: OpportunityMock[];
  contacts: ContactMock[];
  cases: CaseMock[];
  risks: RiskSignal[];
  nextBestActions: NextBestAction[];
  activity: ActivityItem[];
  kpis: KpiMetric[];
  executiveSummary: string;
}

export const accountIntelligenceMock: AccountIntelligenceMock = {
  account: {
    name: 'Acme Industrial Systems',
    industry: 'Manufacturing',
    annualRevenue: '$48.2M',
    healthScore: 82,
    riskLevel: 'Moderate',
    owner: 'Maya Chen',
    type: 'Strategic Customer',
    employees: 4200,
    hqCity: 'Cleveland, OH',
    renewalDate: '2026-09-30',
    lastTouch: '4 days ago',
  },
  opportunities: [
    { name: 'North America Expansion', stage: 'Proposal/Price Quote', amount: '$420,000', closeDate: '2026-06-30', probability: 65, owner: 'Maya Chen' },
    { name: 'IoT Sensor Rollout - Phase 2', stage: 'Negotiation/Review', amount: '$185,500', closeDate: '2026-05-22', probability: 80, owner: 'Devon Park' },
    { name: 'Premier Support Renewal', stage: 'Closed Won', amount: '$96,000', closeDate: '2026-04-04', probability: 100, owner: 'Maya Chen' },
    { name: 'EU Compliance Add-On', stage: 'Qualification', amount: '$58,000', closeDate: '2026-08-15', probability: 25, owner: 'Priya Natarajan' },
  ],
  contacts: [
    { name: 'Jordan Reyes', title: 'VP Operations', email: 'jordan.reyes@acme.example', phone: '+1 216 555 0142', influence: 'Champion' },
    { name: 'Sasha Liu', title: 'CIO', email: 'sasha.liu@acme.example', phone: '+1 216 555 0188', influence: 'Decision Maker' },
    { name: 'Marco DeLuca', title: 'Director of Procurement', email: 'marco.deluca@acme.example', phone: '+1 216 555 0117', influence: 'Detractor' },
    { name: 'Rina Okafor', title: 'Plant Manager', email: 'rina.okafor@acme.example', phone: '+1 216 555 0163', influence: 'Influencer' },
  ],
  cases: [
    { caseNumber: '00048291', subject: 'Integration latency after ERP sync', priority: 'High', status: 'Working', ageDays: 3 },
    { caseNumber: '00048256', subject: 'Permission set assignment failing for plant techs', priority: 'Medium', status: 'Escalated', ageDays: 7 },
    { caseNumber: '00048210', subject: 'Quarterly usage report missing two facilities', priority: 'Low', status: 'New', ageDays: 1 },
  ],
  risks: [
    { label: 'Renewal at risk', severity: 'warning', detail: 'Sentiment dropped 12% after April outage; renewal in 5 months.' },
    { label: 'Detractor identified', severity: 'error', detail: 'Marco DeLuca has flagged pricing concerns in 3 meetings.' },
    { label: 'Open critical case', severity: 'warning', detail: 'Case 00048291 affects production line in Cleveland plant.' },
  ],
  nextBestActions: [
    { title: 'Schedule executive business review', rationale: 'No EBR on record in last 9 months for a Strategic Customer.', ctaLabel: 'Schedule EBR' },
    { title: 'Loop in Customer Success on case 00048291', rationale: 'High-priority case touching renewal-blocking workflow.', ctaLabel: 'Assign CSM' },
    { title: 'Send ROI summary to CIO', rationale: 'Phase 1 IoT deployment delivered $1.2M annualized savings.', ctaLabel: 'Send Summary' },
  ],
  activity: [
    { type: 'meeting', subject: 'Quarterly review with Jordan Reyes', who: 'Maya Chen', when: 'Apr 27, 2026' },
    { type: 'email', subject: 'Re: Phase 2 sensor scoping', who: 'Devon Park', when: 'Apr 26, 2026' },
    { type: 'call', subject: 'Pricing follow-up with Marco DeLuca', who: 'Maya Chen', when: 'Apr 24, 2026' },
    { type: 'note', subject: 'Logged risk: detractor pattern from procurement', who: 'Maya Chen', when: 'Apr 24, 2026' },
  ],
  kpis: [
    { label: 'Health Score', value: '82', delta: '-4 QoQ', trend: 'down' },
    { label: 'Open Pipeline', value: '$663K', delta: '+12% QoQ', trend: 'up' },
    { label: 'Closed Won FY', value: '$1.84M', delta: '+8% YoY', trend: 'up' },
    { label: 'Open Cases', value: '3', delta: '+1 WoW', trend: 'up' },
  ],
  executiveSummary:
    'Acme Industrial Systems remains a Strategic Customer with $1.84M closed-won this fiscal year and a healthy $663K active pipeline anchored by the North America Expansion opportunity. Health has slipped four points this quarter driven by a high-priority integration case and a procurement detractor. Renewal in September is on track if we secure an executive business review and resolve case 00048291 within SLA.',
};
