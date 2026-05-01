export type SalesforceDomain =
  | 'sales'
  | 'service'
  | 'platform'
  | 'admin'
  | 'devops'
  | 'analytics'
  | 'custom';

export type SalesforceSurface =
  | 'recordPage'
  | 'appPage'
  | 'homePage'
  | 'flowScreen'
  | 'utilityBar'
  | 'consolePanel'
  | 'modal'
  | 'dashboard';

export type SalesforcePersona =
  | 'admin'
  | 'developer'
  | 'architect'
  | 'salesLeader'
  | 'serviceLeader'
  | 'executive'
  | 'endUser';

export type VisualTone = 'standard' | 'dense' | 'executive' | 'mobile' | 'experimental';

export interface SalesforceIntent {
  domain: SalesforceDomain;
  targetSurface: SalesforceSurface;
  primaryObject?: string;
  relatedObjects: string[];
  userPersona: SalesforcePersona;
  dataNeeds: string[];
  interactionNeeds: string[];
  visualTone: VisualTone;
}

const OBJECT_KEYWORDS: Record<string, string> = {
  account: 'Account',
  accounts: 'Account',
  opportunity: 'Opportunity',
  opportunities: 'Opportunity',
  contact: 'Contact',
  contacts: 'Contact',
  lead: 'Lead',
  leads: 'Lead',
  case: 'Case',
  cases: 'Case',
  task: 'Task',
  tasks: 'Task',
  campaign: 'Campaign',
  asset: 'Asset',
  product: 'Product2',
  quote: 'Quote',
  contract: 'Contract',
  order: 'Order',
};

const DOMAIN_RULES: Array<{ domain: SalesforceDomain; words: string[] }> = [
  { domain: 'service', words: ['case', 'sla', 'queue', 'entitlement', 'incident', 'support', 'escalation', 'agent'] },
  { domain: 'sales', words: ['opportunity', 'pipeline', 'forecast', 'quota', 'deal', 'account', 'contact', 'lead', 'cpq', 'revenue'] },
  { domain: 'admin', words: ['permission', 'profile', 'access', 'muting', 'setup', 'sharing rule', 'role'] },
  { domain: 'devops', words: ['deploy', 'metadata', 'github', 'org diff', 'pipeline ci', 'release', 'change set'] },
  { domain: 'analytics', words: ['kpi', 'dashboard', 'metric', 'report', 'analytics', 'einstein discovery'] },
  { domain: 'platform', words: ['flow', 'apex', 'lightning component', 'platform event', 'integration'] },
];

const SURFACE_RULES: Array<{ surface: SalesforceSurface; words: string[] }> = [
  { surface: 'flowScreen', words: ['flow', 'screen flow', 'guided', 'wizard', 'decision'] },
  { surface: 'consolePanel', words: ['console', 'workspace', 'agent desk', 'command center'] },
  { surface: 'dashboard', words: ['dashboard', 'kpi', 'executive', 'board', 'vp of'] },
  { surface: 'utilityBar', words: ['utility bar', 'utility item'] },
  { surface: 'modal', words: ['modal', 'dialog'] },
  { surface: 'homePage', words: ['home page', 'home tab'] },
  { surface: 'appPage', words: ['app page', 'app builder page'] },
  { surface: 'recordPage', words: ['record page', 'record detail', 'highlights panel'] },
];

const PERSONA_RULES: Array<{ persona: SalesforcePersona; words: string[] }> = [
  { persona: 'executive', words: ['vp', 'cxo', 'ceo', 'board', 'executive', 'stakeholder'] },
  { persona: 'salesLeader', words: ['sales leader', 'sales manager', 'sales ops', 'rvp'] },
  { persona: 'serviceLeader', words: ['service leader', 'support manager', 'contact center'] },
  { persona: 'architect', words: ['architect', 'solution architect'] },
  { persona: 'developer', words: ['developer', 'engineer', 'apex'] },
  { persona: 'admin', words: ['admin', 'administrator', 'salesforce admin'] },
];

const TONE_RULES: Array<{ tone: VisualTone; words: string[] }> = [
  { tone: 'executive', words: ['vp', 'executive', 'board', 'stakeholder', 'premium'] },
  { tone: 'dense', words: ['console', 'dense', 'compact', 'agent desk', 'workspace'] },
  { tone: 'mobile', words: ['mobile', 'phone', 'field rep', 'on the go'] },
  { tone: 'experimental', words: ['vibe', 'experimental', 'futuristic', 'premium'] },
];

const INTERACTION_KEYWORDS = [
  'edit', 'create', 'approve', 'reject', 'assign', 'escalate', 'merge',
  'export', 'filter', 'search', 'inline edit', 'wizard', 'next best action',
];

const DATA_KEYWORDS = [
  'health', 'risk', 'pipeline', 'forecast', 'sla', 'priority', 'status',
  'amount', 'close date', 'stage', 'owner', 'next steps', 'activity',
  'summary', 'kpi', 'metric',
];

function score(text: string, words: string[]): number {
  let s = 0;
  for (const w of words) {
    if (text.includes(w)) s += 1;
  }
  return s;
}

export function parseSalesforceIntent(prompt: string): SalesforceIntent {
  const text = prompt.toLowerCase();

  // Objects
  const found = new Set<string>();
  for (const [kw, obj] of Object.entries(OBJECT_KEYWORDS)) {
    const re = new RegExp(`\\b${kw}\\b`);
    if (re.test(text)) found.add(obj);
  }
  const primaryObject = [...found][0];
  const relatedObjects = [...found].slice(1);

  // Domain
  let domain: SalesforceDomain = 'custom';
  let best = 0;
  for (const r of DOMAIN_RULES) {
    const s = score(text, r.words);
    if (s > best) { best = s; domain = r.domain; }
  }
  if (best === 0 && primaryObject) {
    domain = primaryObject === 'Case' ? 'service' : 'sales';
  }

  // Surface
  let targetSurface: SalesforceSurface = 'recordPage';
  let surfaceBest = 0;
  for (const r of SURFACE_RULES) {
    const s = score(text, r.words);
    if (s > surfaceBest) { surfaceBest = s; targetSurface = r.surface; }
  }

  // Persona
  let userPersona: SalesforcePersona = 'endUser';
  let pBest = 0;
  for (const r of PERSONA_RULES) {
    const s = score(text, r.words);
    if (s > pBest) { pBest = s; userPersona = r.persona; }
  }

  // Tone
  let visualTone: VisualTone = 'standard';
  let tBest = 0;
  for (const r of TONE_RULES) {
    const s = score(text, r.words);
    if (s > tBest) { tBest = s; visualTone = r.tone; }
  }

  const dataNeeds = DATA_KEYWORDS.filter((w) => text.includes(w));
  const interactionNeeds = INTERACTION_KEYWORDS.filter((w) => text.includes(w));

  return {
    domain,
    targetSurface,
    primaryObject,
    relatedObjects,
    userPersona,
    dataNeeds,
    interactionNeeds,
    visualTone,
  };
}
