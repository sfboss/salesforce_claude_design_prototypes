// SLDS pattern primitives. These return HTML strings.
// Used by the variant engine to build both static previews and LWC templates.

export function escape(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function badge(label: string, theme: 'default' | 'success' | 'warning' | 'error' | 'inverse' = 'default'): string {
  const cls = theme === 'default' ? 'slds-badge' : `slds-badge slds-theme_${theme}`;
  return `<span class="${cls}">${escape(label)}</span>`;
}

export function pill(label: string): string {
  return `<span class="slds-pill"><span class="slds-pill__label">${escape(label)}</span></span>`;
}

export function metricCard(label: string, value: string, delta: string, trend: 'up' | 'down' | 'flat'): string {
  const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '▬';
  const trendClass = trend === 'up' ? 'slds-text-color_success' : trend === 'down' ? 'slds-text-color_error' : 'slds-text-color_weak';
  return `
    <article class="slds-card slds-p-around_medium">
      <p class="slds-text-title_caps slds-text-color_weak">${escape(label)}</p>
      <p class="slds-text-heading_large slds-m-top_xx-small">${escape(value)}</p>
      <p class="slds-text-body_small ${trendClass}">${arrow} ${escape(delta)}</p>
    </article>
  `;
}

export function highlightsTile(label: string, value: string): string {
  return `
    <div class="slds-page-header__detail-block">
      <p class="slds-text-title slds-truncate slds-text-color_weak" title="${escape(label)}">${escape(label)}</p>
      <p class="slds-text-body_regular slds-truncate" title="${escape(value)}">${escape(value)}</p>
    </div>
  `;
}

export function severityIcon(severity: 'info' | 'warning' | 'error'): string {
  const map = { info: 'ℹ', warning: '⚠', error: '⛔' } as const;
  const themeClass =
    severity === 'error' ? 'slds-text-color_error' : severity === 'warning' ? 'slds-text-color_warning' : 'slds-text-color_weak';
  return `<span class="slds-icon_container ${themeClass}" aria-hidden="true">${map[severity]}</span>`;
}

export function activityIcon(type: 'email' | 'call' | 'meeting' | 'note'): string {
  const map = { email: '✉', call: '☎', meeting: '👥', note: '📝' } as const;
  return `<span class="slds-icon_container" aria-hidden="true">${map[type]}</span>`;
}

export function table(headers: string[], rows: string[][], opts: { striped?: boolean; bordered?: boolean } = {}): string {
  const cls = ['slds-table', 'slds-table_cell-buffer'];
  if (opts.bordered) cls.push('slds-table_bordered');
  if (opts.striped) cls.push('slds-table_striped');
  const head = headers.map((h) => `<th scope="col"><div class="slds-truncate" title="${escape(h)}">${escape(h)}</div></th>`).join('');
  const body = rows
    .map(
      (r) =>
        `<tr>${r
          .map((c) => `<td><div class="slds-truncate" title="${escape(stripTags(c))}">${c}</div></td>`)
          .join('')}</tr>`,
    )
    .join('');
  return `<table class="${cls.join(' ')}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '');
}

export function card(title: string, body: string, footer?: string): string {
  return `
    <article class="slds-card">
      <header class="slds-card__header slds-grid">
        <h2 class="slds-card__header-title slds-text-heading_small">${escape(title)}</h2>
      </header>
      <div class="slds-card__body slds-card__body_inner">${body}</div>
      ${footer ? `<footer class="slds-card__footer">${footer}</footer>` : ''}
    </article>
  `;
}

export const PATTERN_IDS = [
  'appShell',
  'recordPage',
  'highlightsPanel',
  'pathProgress',
  'relatedList',
  'lightningCard',
  'metricCard',
  'datatable',
  'modal',
  'toastRegion',
  'emptyState',
  'inlineEditRow',
  'activityTimeline',
  'caseFeed',
  'opportunityPipelinePanel',
  'riskSignalPanel',
  'nextBestActionCard',
  'flowScreenLayout',
  'setupAdminTable',
  'permissionMatrix',
  'deploymentStatusPanel',
] as const;

export type PatternId = (typeof PATTERN_IDS)[number];
