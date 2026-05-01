import { accountIntelligenceMock, type AccountIntelligenceMock } from '@lwc-design-studio/slds-patterns';
import { escape, badge, metricCard, severityIcon, activityIcon, table, highlightsTile } from '@lwc-design-studio/slds-patterns';

export interface VariantSpec {
  id: string;
  label: string;
  componentName: string;
  description: string;
  designRationale: string;
  visualTone: 'standard' | 'dense' | 'executive' | 'mobile' | 'experimental';
  defaultDevice: 'desktop' | 'tablet' | 'mobile';
}

export const VARIANT_SPECS: VariantSpec[] = [
  {
    id: 'variant-01-standard-record-page',
    label: 'Standard Record Page',
    componentName: 'accountIntelligenceConsoleStandard',
    description: 'Conservative Lightning record page layout for an Account Intelligence Console.',
    designRationale: 'Two-column record summary with highlights panel, related lists, and recent activity. Mirrors stock Lightning record page conventions admins and end users will recognize immediately.',
    visualTone: 'standard',
    defaultDevice: 'desktop',
  },
  {
    id: 'variant-02-console-dense',
    label: 'Console Dense',
    componentName: 'accountIntelligenceConsoleDense',
    description: 'Compact three-rail console workspace optimized for power users.',
    designRationale: 'Left context rail, center datatable workspace, right insight/action rail. Tight typography and many visible records — built for sales ops or service leads working multiple accounts at once.',
    visualTone: 'dense',
    defaultDevice: 'desktop',
  },
  {
    id: 'variant-03-executive-dashboard',
    label: 'Executive Dashboard',
    componentName: 'accountIntelligenceConsoleExecutive',
    description: 'Stakeholder-ready dashboard layout with KPIs and narrative summary.',
    designRationale: 'KPI grid on top, executive narrative card, pipeline and risk summaries side-by-side, and recommended actions. Designed for VP-level read-only review.',
    visualTone: 'executive',
    defaultDevice: 'desktop',
  },
  {
    id: 'variant-04-mobile-card-stack',
    label: 'Mobile Card Stack',
    componentName: 'accountIntelligenceConsoleMobile',
    description: 'Responsive mobile-first stack for field reps.',
    designRationale: 'Stacked cards with large touch targets, condensed related lists, and a sticky CTA bar. Tuned for Salesforce mobile / field execution.',
    visualTone: 'mobile',
    defaultDevice: 'mobile',
  },
  {
    id: 'variant-05-vibe-coded-premium',
    label: 'Vibe-Coded Premium',
    componentName: 'accountIntelligenceConsolePremium',
    description: 'Elevated visual treatment with premium accents while staying SLDS-plausible.',
    designRationale: 'Subtle gradient accents, soft glassy cards, and stronger hierarchy. Still SLDS-compatible so it could plausibly ship as a premium AppExchange surface.',
    visualTone: 'experimental',
    defaultDevice: 'desktop',
  },
];

// ---------- Static preview renderers (full HTML with inlined data) ----------

function kpiGrid(mock: AccountIntelligenceMock): string {
  return `<div class="slds-grid slds-gutters_small slds-wrap">${mock.kpis
    .map((k) => `<div class="slds-col slds-size_1-of-2 slds-large-size_1-of-4 slds-m-bottom_small">${metricCard(k.label, k.value, k.delta, k.trend)}</div>`)
    .join('')}</div>`;
}

function highlightsPanel(mock: AccountIntelligenceMock): string {
  const a = mock.account;
  return `
    <div class="slds-page-header slds-page-header_record-home">
      <div class="slds-page-header__row">
        <div class="slds-page-header__col-title">
          <div class="slds-media">
            <div class="slds-media__figure">
              <span class="slds-icon_container slds-icon-standard-account" title="Account">
                <span class="slds-icon slds-icon_medium" aria-hidden="true">🏢</span>
              </span>
            </div>
            <div class="slds-media__body">
              <p class="slds-text-title_caps slds-line-height_reset">Account · ${escape(a.type)}</p>
              <h1 class="slds-page-header__title slds-truncate slds-text-heading_medium">${escape(a.name)}</h1>
              <p class="slds-text-body_small slds-text-color_weak">${escape(a.industry)} · HQ ${escape(a.hqCity)} · Owner ${escape(a.owner)}</p>
            </div>
          </div>
        </div>
        <div class="slds-page-header__col-actions">
          <div class="slds-page-header__controls">
            <button class="slds-button slds-button_neutral">Edit</button>
            <button class="slds-button slds-button_neutral">New Opportunity</button>
            <button class="slds-button slds-button_brand">Log a Call</button>
          </div>
        </div>
      </div>
      <div class="slds-page-header__row slds-page-header__row_gutters">
        <div class="slds-page-header__col-details">
          <ul class="slds-page-header__detail-row">
            <li class="slds-page-header__detail-block">${highlightsTile('Annual Revenue', a.annualRevenue)}</li>
            <li class="slds-page-header__detail-block">${highlightsTile('Health Score', String(a.healthScore))}</li>
            <li class="slds-page-header__detail-block">${highlightsTile('Risk Level', a.riskLevel)}</li>
            <li class="slds-page-header__detail-block">${highlightsTile('Renewal Date', a.renewalDate)}</li>
            <li class="slds-page-header__detail-block">${highlightsTile('Last Touch', a.lastTouch)}</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function opportunitiesTable(mock: AccountIntelligenceMock): string {
  const rows = mock.opportunities.map((o) => [
    `<a href="javascript:void(0)">${escape(o.name)}</a>`,
    escape(o.stage),
    escape(o.amount),
    escape(o.closeDate),
    `${o.probability}%`,
    escape(o.owner),
  ]);
  return table(['Opportunity', 'Stage', 'Amount', 'Close Date', 'Probability', 'Owner'], rows, { bordered: true });
}

function contactsList(mock: AccountIntelligenceMock): string {
  return `<ul class="slds-has-dividers_around-space">${mock.contacts
    .map(
      (c) => `
      <li class="slds-item slds-p-around_small">
        <div class="slds-grid slds-grid_align-spread">
          <div>
            <p class="slds-text-body_regular"><strong>${escape(c.name)}</strong> · <span class="slds-text-color_weak">${escape(c.title)}</span></p>
            <p class="slds-text-body_small slds-text-color_weak">${escape(c.email)} · ${escape(c.phone)}</p>
          </div>
          <div>${badge(c.influence, c.influence === 'Detractor' ? 'error' : c.influence === 'Champion' ? 'success' : 'default')}</div>
        </div>
      </li>`,
    )
    .join('')}</ul>`;
}

function casesPanel(mock: AccountIntelligenceMock): string {
  return `<ul class="slds-has-dividers_bottom-space">${mock.cases
    .map(
      (c) => `
      <li class="slds-item slds-p-vertical_x-small">
        <div class="slds-grid slds-grid_align-spread">
          <div>
            <p class="slds-text-body_regular"><strong>#${escape(c.caseNumber)}</strong> · ${escape(c.subject)}</p>
            <p class="slds-text-body_small slds-text-color_weak">Age ${c.ageDays}d · ${escape(c.status)}</p>
          </div>
          <div>${badge(c.priority, c.priority === 'Critical' || c.priority === 'High' ? 'error' : c.priority === 'Medium' ? 'warning' : 'default')}</div>
        </div>
      </li>`,
    )
    .join('')}</ul>`;
}

function risksPanel(mock: AccountIntelligenceMock): string {
  return `<ul class="slds-has-dividers_around-space">${mock.risks
    .map(
      (r) => `
      <li class="slds-item slds-p-around_small">
        <div class="slds-grid slds-gutters_x-small">
          <div class="slds-col slds-shrink-none">${severityIcon(r.severity)}</div>
          <div class="slds-col">
            <p class="slds-text-body_regular"><strong>${escape(r.label)}</strong></p>
            <p class="slds-text-body_small slds-text-color_weak">${escape(r.detail)}</p>
          </div>
        </div>
      </li>`,
    )
    .join('')}</ul>`;
}

function nbaPanel(mock: AccountIntelligenceMock): string {
  return `<ul class="slds-has-dividers_around-space">${mock.nextBestActions
    .map(
      (n) => `
      <li class="slds-item slds-p-around_small">
        <p class="slds-text-body_regular"><strong>${escape(n.title)}</strong></p>
        <p class="slds-text-body_small slds-text-color_weak slds-m-bottom_x-small">${escape(n.rationale)}</p>
        <button class="slds-button slds-button_brand">${escape(n.ctaLabel)}</button>
      </li>`,
    )
    .join('')}</ul>`;
}

function activityTimeline(mock: AccountIntelligenceMock): string {
  return `<ul class="slds-timeline">${mock.activity
    .map(
      (a) => `
      <li class="slds-timeline__item slds-p-around_small">
        <div class="slds-grid slds-gutters_x-small">
          <div class="slds-col slds-shrink-none">${activityIcon(a.type)}</div>
          <div class="slds-col">
            <p class="slds-text-body_regular"><strong>${escape(a.subject)}</strong></p>
            <p class="slds-text-body_small slds-text-color_weak">${escape(a.who)} · ${escape(a.when)}</p>
          </div>
        </div>
      </li>`,
    )
    .join('')}</ul>`;
}

// ---------- Variant preview HTML ----------

export function previewVariant1Standard(mock: AccountIntelligenceMock): string {
  return `
    <div class="slds-scope">
      ${highlightsPanel(mock)}
      <div class="slds-grid slds-gutters slds-wrap slds-p-around_medium">
        <div class="slds-col slds-size_1-of-1 slds-large-size_8-of-12">
          <article class="slds-card slds-m-bottom_medium">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Open Opportunities</h2></header>
            <div class="slds-card__body slds-card__body_inner">${opportunitiesTable(mock)}</div>
          </article>
          <article class="slds-card slds-m-bottom_medium">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Recent Activity</h2></header>
            <div class="slds-card__body slds-card__body_inner">${activityTimeline(mock)}</div>
          </article>
        </div>
        <div class="slds-col slds-size_1-of-1 slds-large-size_4-of-12">
          <article class="slds-card slds-m-bottom_medium">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Related Contacts</h2></header>
            <div class="slds-card__body">${contactsList(mock)}</div>
          </article>
          <article class="slds-card slds-m-bottom_medium">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Recent Cases</h2></header>
            <div class="slds-card__body slds-card__body_inner">${casesPanel(mock)}</div>
          </article>
          <article class="slds-card slds-m-bottom_medium">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Next Steps</h2></header>
            <div class="slds-card__body slds-card__body_inner">${nbaPanel(mock)}</div>
          </article>
        </div>
      </div>
    </div>
  `;
}

export function previewVariant2Dense(mock: AccountIntelligenceMock): string {
  return `
    <div class="slds-scope lds-console" data-density="compact">
      <div class="slds-grid slds-gutters_x-small slds-wrap">
        <aside class="slds-col slds-size_3-of-12 slds-p-around_x-small">
          <article class="slds-box slds-box_x-small slds-m-bottom_x-small">
            <p class="slds-text-title_caps">Account</p>
            <p class="slds-text-heading_small">${escape(mock.account.name)}</p>
            <p class="slds-text-body_small slds-text-color_weak">${escape(mock.account.industry)} · ${escape(mock.account.type)}</p>
          </article>
          <article class="slds-box slds-box_x-small slds-m-bottom_x-small">
            <p class="slds-text-title_caps">Health</p>
            <p class="slds-text-heading_medium">${mock.account.healthScore}</p>
            <p class="slds-text-body_small slds-text-color_weak">Risk · ${escape(mock.account.riskLevel)}</p>
          </article>
          <article class="slds-box slds-box_x-small slds-m-bottom_x-small">
            <p class="slds-text-title_caps">Owner</p>
            <p class="slds-text-body_regular">${escape(mock.account.owner)}</p>
            <p class="slds-text-body_small slds-text-color_weak">Last touch ${escape(mock.account.lastTouch)}</p>
          </article>
          <article class="slds-box slds-box_x-small">
            <p class="slds-text-title_caps">Cases</p>
            ${casesPanel(mock)}
          </article>
        </aside>
        <section class="slds-col slds-size_6-of-12 slds-p-around_x-small">
          <article class="slds-card">
            <header class="slds-card__header slds-grid slds-grid_align-spread">
              <h2 class="slds-text-heading_small">Pipeline · ${mock.opportunities.length} open</h2>
              <div><button class="slds-button slds-button_neutral slds-button_small">Filter</button> <button class="slds-button slds-button_neutral slds-button_small">Export</button></div>
            </header>
            <div class="slds-card__body slds-card__body_inner">${opportunitiesTable(mock)}</div>
          </article>
          <article class="slds-card slds-m-top_x-small">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Activity Stream</h2></header>
            <div class="slds-card__body slds-card__body_inner">${activityTimeline(mock)}</div>
          </article>
        </section>
        <aside class="slds-col slds-size_3-of-12 slds-p-around_x-small">
          <article class="slds-box slds-box_x-small slds-m-bottom_x-small">
            <p class="slds-text-title_caps">Risk Signals</p>
            ${risksPanel(mock)}
          </article>
          <article class="slds-box slds-box_x-small">
            <p class="slds-text-title_caps">Next Best Actions</p>
            ${nbaPanel(mock)}
          </article>
        </aside>
      </div>
    </div>
  `;
}

export function previewVariant3Executive(mock: AccountIntelligenceMock): string {
  return `
    <div class="slds-scope slds-p-around_large lds-executive">
      <header class="slds-m-bottom_medium">
        <p class="slds-text-title_caps slds-text-color_weak">Account Intelligence · ${escape(mock.account.type)}</p>
        <h1 class="slds-text-heading_large">${escape(mock.account.name)}</h1>
        <p class="slds-text-body_regular slds-text-color_weak">${escape(mock.account.industry)} · ${escape(mock.account.hqCity)} · Owner ${escape(mock.account.owner)}</p>
      </header>
      ${kpiGrid(mock)}
      <div class="slds-grid slds-gutters slds-wrap slds-m-top_medium">
        <div class="slds-col slds-size_1-of-1 slds-large-size_7-of-12">
          <article class="slds-card slds-p-around_medium">
            <h2 class="slds-text-heading_small slds-m-bottom_x-small">Executive Summary</h2>
            <p class="slds-text-body_regular">${escape(mock.executiveSummary)}</p>
          </article>
          <article class="slds-card slds-m-top_medium">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Open Pipeline</h2></header>
            <div class="slds-card__body slds-card__body_inner">${opportunitiesTable(mock)}</div>
          </article>
        </div>
        <div class="slds-col slds-size_1-of-1 slds-large-size_5-of-12">
          <article class="slds-card slds-m-bottom_medium">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Risk Summary</h2></header>
            <div class="slds-card__body slds-card__body_inner">${risksPanel(mock)}</div>
          </article>
          <article class="slds-card">
            <header class="slds-card__header"><h2 class="slds-text-heading_small">Recommended Actions</h2></header>
            <div class="slds-card__body slds-card__body_inner">${nbaPanel(mock)}</div>
          </article>
        </div>
      </div>
    </div>
  `;
}

export function previewVariant4Mobile(mock: AccountIntelligenceMock): string {
  return `
    <div class="slds-scope lds-mobile" style="max-width: 480px; margin: 0 auto;">
      <header class="slds-p-around_medium" style="background:#0176d3;color:#fff;">
        <p class="slds-text-title_caps">Account</p>
        <h1 class="slds-text-heading_medium">${escape(mock.account.name)}</h1>
        <p class="slds-text-body_small">${escape(mock.account.industry)} · Health ${mock.account.healthScore} · ${escape(mock.account.riskLevel)} risk</p>
      </header>
      <div class="slds-p-around_small">
        <article class="slds-card slds-m-bottom_small slds-p-around_medium">
          <h2 class="slds-text-heading_small">Today's Focus</h2>
          ${nbaPanel(mock)}
        </article>
        <article class="slds-card slds-m-bottom_small">
          <header class="slds-card__header"><h2 class="slds-text-heading_small">Open Opportunities</h2></header>
          <div class="slds-card__body slds-card__body_inner">
            <ul class="slds-has-dividers_bottom-space">
              ${mock.opportunities
                .map(
                  (o) => `
                  <li class="slds-item slds-p-vertical_x-small">
                    <p class="slds-text-body_regular"><strong>${escape(o.name)}</strong></p>
                    <p class="slds-text-body_small slds-text-color_weak">${escape(o.stage)} · ${escape(o.amount)} · ${o.probability}%</p>
                  </li>`,
                )
                .join('')}
            </ul>
          </div>
        </article>
        <article class="slds-card slds-m-bottom_small">
          <header class="slds-card__header"><h2 class="slds-text-heading_small">Cases</h2></header>
          <div class="slds-card__body slds-card__body_inner">${casesPanel(mock)}</div>
        </article>
        <article class="slds-card slds-m-bottom_small">
          <header class="slds-card__header"><h2 class="slds-text-heading_small">Risk Signals</h2></header>
          <div class="slds-card__body slds-card__body_inner">${risksPanel(mock)}</div>
        </article>
      </div>
      <footer style="position:sticky;bottom:0;background:#fff;border-top:1px solid #e5e5e5;padding:12px;display:flex;gap:8px;">
        <button class="slds-button slds-button_neutral" style="flex:1;">Log Call</button>
        <button class="slds-button slds-button_brand" style="flex:1;">New Task</button>
      </footer>
    </div>
  `;
}

export function previewVariant5Premium(mock: AccountIntelligenceMock): string {
  return `
    <div class="slds-scope lds-premium" style="background:linear-gradient(180deg,#f3f6fb 0%,#ffffff 60%);min-height:100%;">
      <div class="slds-p-around_large">
        <div style="background:linear-gradient(120deg,#032d60,#0b5cab);color:#fff;border-radius:14px;padding:24px;box-shadow:0 10px 30px rgba(3,45,96,0.15);">
          <p class="slds-text-title_caps" style="opacity:0.8;">Account Intelligence</p>
          <h1 class="slds-text-heading_large" style="color:#fff;">${escape(mock.account.name)}</h1>
          <p style="opacity:0.85;">${escape(mock.account.industry)} · ${escape(mock.account.hqCity)} · Owner ${escape(mock.account.owner)}</p>
          <div class="slds-grid slds-gutters_small slds-wrap slds-m-top_medium">
            ${mock.kpis
              .map(
                (k) => `
                <div class="slds-col slds-size_1-of-2 slds-large-size_1-of-4">
                  <div style="background:rgba(255,255,255,0.10);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,0.18);border-radius:10px;padding:14px;">
                    <p class="slds-text-title_caps" style="opacity:0.8;">${escape(k.label)}</p>
                    <p class="slds-text-heading_large" style="color:#fff;">${escape(k.value)}</p>
                    <p style="opacity:0.85;font-size:12px;">${escape(k.delta)}</p>
                  </div>
                </div>`,
              )
              .join('')}
          </div>
        </div>
        <div class="slds-grid slds-gutters slds-wrap slds-m-top_medium">
          <div class="slds-col slds-size_1-of-1 slds-large-size_7-of-12">
            <article class="slds-card slds-p-around_medium" style="border-radius:12px;">
              <h2 class="slds-text-heading_small slds-m-bottom_x-small">Executive Narrative</h2>
              <p class="slds-text-body_regular">${escape(mock.executiveSummary)}</p>
            </article>
            <article class="slds-card slds-m-top_medium" style="border-radius:12px;">
              <header class="slds-card__header"><h2 class="slds-text-heading_small">Open Pipeline</h2></header>
              <div class="slds-card__body slds-card__body_inner">${opportunitiesTable(mock)}</div>
            </article>
          </div>
          <div class="slds-col slds-size_1-of-1 slds-large-size_5-of-12">
            <article class="slds-card slds-m-bottom_medium" style="border-radius:12px;">
              <header class="slds-card__header"><h2 class="slds-text-heading_small">Risk Signals</h2></header>
              <div class="slds-card__body slds-card__body_inner">${risksPanel(mock)}</div>
            </article>
            <article class="slds-card" style="border-radius:12px;">
              <header class="slds-card__header"><h2 class="slds-text-heading_small">Next Best Actions</h2></header>
              <div class="slds-card__body slds-card__body_inner">${nbaPanel(mock)}</div>
            </article>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---------- LWC template + JS generation ----------

export interface LwcArtifact {
  html: string;
  js: string;
  css: string;
  xml: string;
  readme: string;
  mockJson: string;
}

const API_VERSION = '63.0';

function lwcTemplateStandard(): string {
  return `<template>
  <article class="slds-card">
    <header class="slds-card__header slds-grid slds-grid_align-spread">
      <div>
        <p class="slds-text-title_caps">Account · {account.type}</p>
        <h1 class="slds-text-heading_medium">{account.name}</h1>
        <p class="slds-text-body_small slds-text-color_weak">{account.industry} · HQ {account.hqCity} · Owner {account.owner}</p>
      </div>
      <div>
        <button class="slds-button slds-button_neutral" onclick={handleEdit}>Edit</button>
        <button class="slds-button slds-button_brand" onclick={handleLogCall}>Log a Call</button>
      </div>
    </header>
    <div class="slds-card__body slds-card__body_inner">
      <ul class="slds-page-header__detail-row">
        <li class="slds-page-header__detail-block"><p class="slds-text-title">Annual Revenue</p><p>{account.annualRevenue}</p></li>
        <li class="slds-page-header__detail-block"><p class="slds-text-title">Health Score</p><p>{account.healthScore}</p></li>
        <li class="slds-page-header__detail-block"><p class="slds-text-title">Risk Level</p><p>{account.riskLevel}</p></li>
        <li class="slds-page-header__detail-block"><p class="slds-text-title">Renewal</p><p>{account.renewalDate}</p></li>
      </ul>
    </div>
  </article>

  <div class="slds-grid slds-gutters slds-wrap slds-m-top_medium">
    <div class="slds-col slds-size_1-of-1 slds-large-size_8-of-12">
      <article class="slds-card slds-m-bottom_medium">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Open Opportunities</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <table class="slds-table slds-table_cell-buffer slds-table_bordered">
            <thead><tr><th>Opportunity</th><th>Stage</th><th>Amount</th><th>Close</th><th>Probability</th><th>Owner</th></tr></thead>
            <tbody>
              <template for:each={opportunities} for:item="opp">
                <tr key={opp.name}>
                  <td>{opp.name}</td>
                  <td>{opp.stage}</td>
                  <td>{opp.amount}</td>
                  <td>{opp.closeDate}</td>
                  <td>{opp.probability}%</td>
                  <td>{opp.owner}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </article>

      <article class="slds-card">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Recent Activity</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <ul class="slds-timeline">
            <template for:each={activity} for:item="a">
              <li key={a.subject} class="slds-timeline__item slds-p-around_small">
                <p><strong>{a.subject}</strong></p>
                <p class="slds-text-body_small slds-text-color_weak">{a.who} · {a.when}</p>
              </li>
            </template>
          </ul>
        </div>
      </article>
    </div>

    <div class="slds-col slds-size_1-of-1 slds-large-size_4-of-12">
      <article class="slds-card slds-m-bottom_medium">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Related Contacts</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <ul class="slds-has-dividers_around-space">
            <template for:each={contacts} for:item="c">
              <li key={c.name} class="slds-item slds-p-around_small">
                <p><strong>{c.name}</strong> · <span class="slds-text-color_weak">{c.title}</span></p>
                <p class="slds-text-body_small">{c.email} · {c.phone}</p>
                <span class="slds-badge">{c.influence}</span>
              </li>
            </template>
          </ul>
        </div>
      </article>

      <article class="slds-card slds-m-bottom_medium">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Recent Cases</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <ul class="slds-has-dividers_bottom-space">
            <template for:each={cases} for:item="c">
              <li key={c.caseNumber} class="slds-item slds-p-vertical_x-small">
                <p><strong>#{c.caseNumber}</strong> · {c.subject}</p>
                <p class="slds-text-body_small slds-text-color_weak">Age {c.ageDays}d · {c.status} · {c.priority}</p>
              </li>
            </template>
          </ul>
        </div>
      </article>

      <article class="slds-card">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Next Best Actions</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <ul class="slds-has-dividers_around-space">
            <template for:each={nextBestActions} for:item="n">
              <li key={n.title} class="slds-item slds-p-around_small">
                <p><strong>{n.title}</strong></p>
                <p class="slds-text-body_small slds-text-color_weak">{n.rationale}</p>
                <button class="slds-button slds-button_brand" onclick={handleAction} data-id={n.title}>{n.ctaLabel}</button>
              </li>
            </template>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>
`;
}

function lwcTemplateDense(): string {
  return `<template>
  <div class="slds-grid slds-gutters_x-small slds-wrap">
    <aside class="slds-col slds-size_3-of-12 slds-p-around_x-small">
      <article class="slds-box slds-box_x-small slds-m-bottom_x-small">
        <p class="slds-text-title_caps">Account</p>
        <p class="slds-text-heading_small">{account.name}</p>
        <p class="slds-text-body_small slds-text-color_weak">{account.industry} · {account.type}</p>
      </article>
      <article class="slds-box slds-box_x-small">
        <p class="slds-text-title_caps">Health</p>
        <p class="slds-text-heading_medium">{account.healthScore}</p>
        <p class="slds-text-body_small slds-text-color_weak">Risk · {account.riskLevel}</p>
      </article>
    </aside>
    <section class="slds-col slds-size_6-of-12 slds-p-around_x-small">
      <article class="slds-card">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Pipeline</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <table class="slds-table slds-table_cell-buffer slds-table_bordered">
            <thead><tr><th>Opportunity</th><th>Stage</th><th>Amount</th><th>Close</th><th>%</th></tr></thead>
            <tbody>
              <template for:each={opportunities} for:item="opp">
                <tr key={opp.name}>
                  <td>{opp.name}</td><td>{opp.stage}</td><td>{opp.amount}</td><td>{opp.closeDate}</td><td>{opp.probability}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </article>
    </section>
    <aside class="slds-col slds-size_3-of-12 slds-p-around_x-small">
      <article class="slds-box slds-box_x-small slds-m-bottom_x-small">
        <p class="slds-text-title_caps">Risk Signals</p>
        <ul>
          <template for:each={risks} for:item="r">
            <li key={r.label}><strong>{r.label}</strong><br/><span class="slds-text-body_small slds-text-color_weak">{r.detail}</span></li>
          </template>
        </ul>
      </article>
      <article class="slds-box slds-box_x-small">
        <p class="slds-text-title_caps">Next Best Actions</p>
        <ul>
          <template for:each={nextBestActions} for:item="n">
            <li key={n.title}><strong>{n.title}</strong> — <button class="slds-button slds-button_brand" onclick={handleAction}>{n.ctaLabel}</button></li>
          </template>
        </ul>
      </article>
    </aside>
  </div>
</template>
`;
}

function lwcTemplateExecutive(): string {
  return `<template>
  <header class="slds-m-bottom_medium">
    <p class="slds-text-title_caps slds-text-color_weak">Account Intelligence · {account.type}</p>
    <h1 class="slds-text-heading_large">{account.name}</h1>
    <p class="slds-text-body_regular slds-text-color_weak">{account.industry} · {account.hqCity} · Owner {account.owner}</p>
  </header>

  <div class="slds-grid slds-gutters_small slds-wrap">
    <template for:each={kpis} for:item="k">
      <div key={k.label} class="slds-col slds-size_1-of-2 slds-large-size_1-of-4 slds-m-bottom_small">
        <article class="slds-card slds-p-around_medium">
          <p class="slds-text-title_caps slds-text-color_weak">{k.label}</p>
          <p class="slds-text-heading_large">{k.value}</p>
          <p class="slds-text-body_small">{k.delta}</p>
        </article>
      </div>
    </template>
  </div>

  <div class="slds-grid slds-gutters slds-wrap slds-m-top_medium">
    <div class="slds-col slds-size_1-of-1 slds-large-size_7-of-12">
      <article class="slds-card slds-p-around_medium">
        <h2 class="slds-text-heading_small">Executive Summary</h2>
        <p class="slds-text-body_regular">{executiveSummary}</p>
      </article>
    </div>
    <div class="slds-col slds-size_1-of-1 slds-large-size_5-of-12">
      <article class="slds-card">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Recommended Actions</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <ul class="slds-has-dividers_around-space">
            <template for:each={nextBestActions} for:item="n">
              <li key={n.title} class="slds-item slds-p-around_small">
                <p><strong>{n.title}</strong></p>
                <p class="slds-text-body_small slds-text-color_weak">{n.rationale}</p>
                <button class="slds-button slds-button_brand" onclick={handleAction}>{n.ctaLabel}</button>
              </li>
            </template>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>
`;
}

function lwcTemplateMobile(): string {
  return `<template>
  <header class="slds-p-around_medium lds-mobile-hero">
    <p class="slds-text-title_caps">Account</p>
    <h1 class="slds-text-heading_medium">{account.name}</h1>
    <p class="slds-text-body_small">{account.industry} · Health {account.healthScore} · {account.riskLevel} risk</p>
  </header>
  <div class="slds-p-around_small">
    <article class="slds-card slds-m-bottom_small slds-p-around_medium">
      <h2 class="slds-text-heading_small">Today's Focus</h2>
      <ul class="slds-has-dividers_around-space">
        <template for:each={nextBestActions} for:item="n">
          <li key={n.title} class="slds-item slds-p-around_small">
            <p><strong>{n.title}</strong></p>
            <p class="slds-text-body_small slds-text-color_weak">{n.rationale}</p>
            <button class="slds-button slds-button_brand" onclick={handleAction}>{n.ctaLabel}</button>
          </li>
        </template>
      </ul>
    </article>
    <article class="slds-card slds-m-bottom_small">
      <header class="slds-card__header"><h2 class="slds-text-heading_small">Open Opportunities</h2></header>
      <div class="slds-card__body slds-card__body_inner">
        <ul class="slds-has-dividers_bottom-space">
          <template for:each={opportunities} for:item="o">
            <li key={o.name} class="slds-item slds-p-vertical_x-small">
              <p><strong>{o.name}</strong></p>
              <p class="slds-text-body_small slds-text-color_weak">{o.stage} · {o.amount} · {o.probability}%</p>
            </li>
          </template>
        </ul>
      </div>
    </article>
  </div>
</template>
`;
}

function lwcTemplatePremium(): string {
  return `<template>
  <section class="lds-premium-hero">
    <p class="slds-text-title_caps">Account Intelligence</p>
    <h1 class="slds-text-heading_large">{account.name}</h1>
    <p>{account.industry} · {account.hqCity} · Owner {account.owner}</p>
    <div class="slds-grid slds-gutters_small slds-wrap slds-m-top_medium">
      <template for:each={kpis} for:item="k">
        <div key={k.label} class="slds-col slds-size_1-of-2 slds-large-size_1-of-4">
          <div class="lds-glass-card">
            <p class="slds-text-title_caps">{k.label}</p>
            <p class="slds-text-heading_large">{k.value}</p>
            <p class="slds-text-body_small">{k.delta}</p>
          </div>
        </div>
      </template>
    </div>
  </section>
  <div class="slds-grid slds-gutters slds-wrap slds-m-top_medium">
    <div class="slds-col slds-size_1-of-1 slds-large-size_7-of-12">
      <article class="slds-card slds-p-around_medium lds-rounded">
        <h2 class="slds-text-heading_small">Executive Narrative</h2>
        <p class="slds-text-body_regular">{executiveSummary}</p>
      </article>
    </div>
    <div class="slds-col slds-size_1-of-1 slds-large-size_5-of-12">
      <article class="slds-card lds-rounded">
        <header class="slds-card__header"><h2 class="slds-text-heading_small">Next Best Actions</h2></header>
        <div class="slds-card__body slds-card__body_inner">
          <ul class="slds-has-dividers_around-space">
            <template for:each={nextBestActions} for:item="n">
              <li key={n.title} class="slds-item slds-p-around_small">
                <p><strong>{n.title}</strong></p>
                <p class="slds-text-body_small slds-text-color_weak">{n.rationale}</p>
                <button class="slds-button slds-button_brand" onclick={handleAction}>{n.ctaLabel}</button>
              </li>
            </template>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>
`;
}

function lwcJs(componentClass: string, mock: AccountIntelligenceMock): string {
  return `import { LightningElement } from 'lwc';

export default class ${componentClass} extends LightningElement {
  account = ${JSON.stringify(mock.account, null, 2).replace(/\n/g, '\n  ')};
  opportunities = ${JSON.stringify(mock.opportunities, null, 2).replace(/\n/g, '\n  ')};
  contacts = ${JSON.stringify(mock.contacts, null, 2).replace(/\n/g, '\n  ')};
  cases = ${JSON.stringify(mock.cases, null, 2).replace(/\n/g, '\n  ')};
  risks = ${JSON.stringify(mock.risks, null, 2).replace(/\n/g, '\n  ')};
  nextBestActions = ${JSON.stringify(mock.nextBestActions, null, 2).replace(/\n/g, '\n  ')};
  activity = ${JSON.stringify(mock.activity, null, 2).replace(/\n/g, '\n  ')};
  kpis = ${JSON.stringify(mock.kpis, null, 2).replace(/\n/g, '\n  ')};
  executiveSummary = ${JSON.stringify(mock.executiveSummary)};

  get healthClass() {
    const s = this.account.healthScore;
    if (s >= 80) return 'slds-text-color_success';
    if (s >= 60) return 'slds-text-color_warning';
    return 'slds-text-color_error';
  }

  handleEdit() {
    // Mockup only; deploy notes describe wiring to real Apex/UIAPI.
    this.dispatchEvent(new CustomEvent('edit'));
  }
  handleLogCall() {
    this.dispatchEvent(new CustomEvent('logcall'));
  }
  handleAction(event) {
    const id = event.target.dataset.id;
    this.dispatchEvent(new CustomEvent('action', { detail: { id } }));
  }
}
`;
}

function lwcCss(variantId: string): string {
  if (variantId === 'variant-04-mobile-card-stack') {
    return `:host { display: block; max-width: 480px; margin: 0 auto; }
.lds-mobile-hero { background: #0176d3; color: #fff; }
.lds-mobile-hero p, .lds-mobile-hero h1 { color: #fff; }
`;
  }
  if (variantId === 'variant-05-vibe-coded-premium') {
    return `:host { display: block; }
.lds-premium-hero {
  background: linear-gradient(120deg, #032d60, #0b5cab);
  color: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(3, 45, 96, 0.15);
}
.lds-premium-hero h1, .lds-premium-hero p { color: #fff; }
.lds-glass-card {
  background: rgba(255,255,255,0.10);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  padding: 14px;
  color: #fff;
}
.lds-rounded { border-radius: 12px; }
`;
  }
  if (variantId === 'variant-02-console-dense') {
    return `:host { display: block; font-size: 13px; }
.slds-card__header { padding: 0.5rem 0.75rem; }
.slds-card__body_inner { padding: 0.5rem 0.75rem; }
`;
  }
  return `:host { display: block; }
`;
}

function lwcXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>${API_VERSION}</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__AppPage</target>
        <target>lightning__RecordPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
`;
}

function readme(spec: VariantSpec, mock: AccountIntelligenceMock): string {
  return `# ${spec.componentName}

${spec.description}

## What this mockup demonstrates
${spec.designRationale}

## Where to place it
- Lightning App Builder targets: AppPage, RecordPage, HomePage.
- Suggested surface: ${spec.visualTone === 'mobile' ? 'Mobile record page or utility item' : 'Desktop record/app page'}.

## Mock data → real data wiring
This component currently uses inline mock data on the class. To wire to a real org:
- Replace \`account\` with a wire to \`getRecord\` or an Apex method returning the Account.
- Replace \`opportunities\`, \`contacts\`, \`cases\` with wires to UI API related lists or Apex.
- Compute KPIs server-side (\`healthScore\`, pipeline totals) for performance.
- Risk signals and next best actions can come from Einstein or a custom service Apex class.

## Assumed objects and fields
- Account: Name, Industry, Type, AnnualRevenue, OwnerId, BillingCity, custom Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c.
- Opportunity: Name, StageName, Amount, CloseDate, Probability, OwnerId.
- Contact: Name, Title, Email, Phone, custom Influence__c.
- Case: CaseNumber, Subject, Priority, Status, plus age computed on render.

## Before production
- Replace mock arrays with wires.
- Add error/loading states for each wired data source.
- Add field-level security checks; use \`lightning/uiRecordApi\` where possible.
- Replace gradients/glass styling with org-approved tokens for the premium variant.

Sample data summary: ${mock.account.name} — ${mock.opportunities.length} open opps, ${mock.cases.length} cases.
`;
}

export function buildLwcArtifact(spec: VariantSpec, mock: AccountIntelligenceMock): LwcArtifact {
  let html = '';
  switch (spec.id) {
    case 'variant-01-standard-record-page': html = lwcTemplateStandard(); break;
    case 'variant-02-console-dense': html = lwcTemplateDense(); break;
    case 'variant-03-executive-dashboard': html = lwcTemplateExecutive(); break;
    case 'variant-04-mobile-card-stack': html = lwcTemplateMobile(); break;
    case 'variant-05-vibe-coded-premium': html = lwcTemplatePremium(); break;
    default: html = lwcTemplateStandard();
  }
  const className = spec.componentName.charAt(0).toUpperCase() + spec.componentName.slice(1);
  return {
    html,
    js: lwcJs(className, mock),
    css: lwcCss(spec.id),
    xml: lwcXml(),
    readme: readme(spec, mock),
    mockJson: JSON.stringify(mock, null, 2),
  };
}

export function previewFor(spec: VariantSpec, mock: AccountIntelligenceMock): string {
  switch (spec.id) {
    case 'variant-01-standard-record-page': return previewVariant1Standard(mock);
    case 'variant-02-console-dense': return previewVariant2Dense(mock);
    case 'variant-03-executive-dashboard': return previewVariant3Executive(mock);
    case 'variant-04-mobile-card-stack': return previewVariant4Mobile(mock);
    case 'variant-05-vibe-coded-premium': return previewVariant5Premium(mock);
    default: return previewVariant1Standard(mock);
  }
}

export { accountIntelligenceMock };
