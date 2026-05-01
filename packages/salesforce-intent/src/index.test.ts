import { describe, it, expect } from 'vitest';
import { parseSalesforceIntent } from './index';

describe('parseSalesforceIntent', () => {
  it('detects sales record page from accounts/opportunities prompt', () => {
    const intent = parseSalesforceIntent(
      'Create an Account Intelligence Console showing opportunities, contacts and health for a VP of Sales',
    );
    expect(intent.domain).toBe('sales');
    expect(intent.primaryObject).toBe('Account');
    expect(intent.relatedObjects).toContain('Opportunity');
    expect(intent.userPersona).toBe('executive');
    expect(intent.visualTone).toBe('executive');
  });

  it('detects service console for cases with SLA', () => {
    const intent = parseSalesforceIntent('Build a case escalation console with SLA and queue routing');
    expect(intent.domain).toBe('service');
    expect(intent.targetSurface).toBe('consolePanel');
    expect(intent.primaryObject).toBe('Case');
  });

  it('detects flow screen', () => {
    const intent = parseSalesforceIntent('A guided screen flow wizard for approving deals');
    expect(intent.targetSurface).toBe('flowScreen');
  });

  it('detects admin permissions', () => {
    const intent = parseSalesforceIntent('Permission set matrix designer for admins');
    expect(intent.domain).toBe('admin');
    expect(intent.userPersona).toBe('admin');
  });

  it('detects devops deployment', () => {
    const intent = parseSalesforceIntent('Deployment radar for metadata releases from GitHub');
    expect(intent.domain).toBe('devops');
  });
});
