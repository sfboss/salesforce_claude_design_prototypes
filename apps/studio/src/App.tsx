import React, { useMemo, useState } from 'react';
import { generateFromPrompt, type GenerationResult, type LwcVariant, type LwcFile } from '@lwc-design-studio/variant-engine';
import { renderPreviewDocument, type Device } from '@lwc-design-studio/lwc-runtime';

const DEMO_PROMPT = `Create a Lightning Web Component mockup for an Account Intelligence Console. It should show account health, open opportunities, recent cases, risk signals, next best actions, related contacts, and an executive summary card. Make it feel like something a Salesforce architect would show to a VP of Sales.`;

type Density = 'comfortable' | 'compact' | 'console';
type Theme = 'lightning' | 'darkConsole' | 'executive';

export function App(): JSX.Element {
  const [prompt, setPrompt] = useState(DEMO_PROMPT);
  const [result, setResult] = useState<GenerationResult>(() => generateFromPrompt(DEMO_PROMPT));
  const [selectedVariantId, setSelectedVariantId] = useState<string>(result.variants[0].id);
  const [device, setDevice] = useState<Device>('desktop');
  const [density, setDensity] = useState<Density>('comfortable');
  const [theme, setTheme] = useState<Theme>('lightning');
  const [activeFile, setActiveFile] = useState<string>(result.variants[0].files[0].path);

  const variant = useMemo<LwcVariant>(
    () => result.variants.find((v) => v.id === selectedVariantId) ?? result.variants[0],
    [result, selectedVariantId],
  );

  const previewSrc = useMemo(() => {
    const html = renderPreviewDocument(variant, device);
    return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
  }, [variant, device]);

  const file: LwcFile | undefined = variant.files.find((f) => f.path === activeFile) ?? variant.files[0];

  const handleGenerate = () => {
    const r = generateFromPrompt(prompt);
    setResult(r);
    setSelectedVariantId(r.variants[0].id);
    setActiveFile(r.variants[0].files[0].path);
  };

  const handleCopy = async () => {
    if (!file) return;
    await navigator.clipboard.writeText(file.content);
  };

  const handleExportSelected = () => {
    downloadVariantBundle(variant);
  };

  const handleExportAll = () => {
    for (const v of result.variants) downloadVariantBundle(v);
  };

  return (
    <div className="studio">
      <aside className="panel panel-left">
        <h1>LWC Design Studio</h1>
        <label>Prompt</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button onClick={handleGenerate}>Generate variants</button>
        </div>

        <h2>Generation Controls</h2>
        <label>Device</label>
        <select value={device} onChange={(e) => setDevice(e.target.value as Device)}>
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>
        <label>Density</label>
        <select value={density} onChange={(e) => setDensity(e.target.value as Density)}>
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
          <option value="console">Console</option>
        </select>
        <label>Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
          <option value="lightning">Lightning</option>
          <option value="darkConsole">Dark Console</option>
          <option value="executive">Executive</option>
        </select>

        <h2>Detected Intent</h2>
        <div>
          <span className="tag">domain: {result.intent.domain}</span>
          <span className="tag">surface: {result.intent.targetSurface}</span>
          <span className="tag">persona: {result.intent.userPersona}</span>
          <span className="tag">tone: {result.intent.visualTone}</span>
        </div>
        <div style={{ marginTop: 8 }}>
          <span className="tag">primary: {result.intent.primaryObject ?? '—'}</span>
          {result.intent.relatedObjects.map((o) => (
            <span key={o} className="tag">{o}</span>
          ))}
        </div>

        {result.warnings.length > 0 && (
          <>
            <h2>Warnings</h2>
            <ul className="diag">
              {result.warnings.map((w) => (
                <li key={w} className="warn">{w}</li>
              ))}
            </ul>
          </>
        )}

        <h2>Export</h2>
        <div className="row">
          <button onClick={handleExportSelected}>Export selected</button>
          <button className="secondary" onClick={handleExportAll}>Export all</button>
        </div>
      </aside>

      <section className="panel-center">
        <div className="preview-toolbar">
          <strong>{variant.label}</strong>
          <span className="note">· {variant.componentName}</span>
          <div className="spacer" />
          <span className="tag">{device}</span>
          <span className="tag">{variant.visualTone}</span>
        </div>
        <div className="preview-frame">
          <iframe title={variant.label} src={previewSrc} />
        </div>
      </section>

      <aside className="panel panel-right">
        <h1>Files</h1>
        <div className="file-list">
          {variant.files.map((f) => (
            <div
              key={f.path}
              className={`file-item ${activeFile === f.path ? 'active' : ''}`}
              onClick={() => setActiveFile(f.path)}
            >
              {f.path.replace(`force-app/main/default/lwc/${variant.componentName}/`, '')}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button className="secondary" onClick={handleCopy}>Copy file</button>
        </div>
        <h2>{file?.path.split('/').pop()}</h2>
        <pre className="code">{file?.content}</pre>

        <h2>Design Rationale</h2>
        <p className="note">{variant.designRationale}</p>

        <h2>Diagnostics</h2>
        <ul className="diag">
          {variant.diagnostics.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <h2>Deploy Notes</h2>
        <ul className="diag">
          {variant.deployNotes.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </aside>

      <div className="panel-bottom">
        {result.variants.map((v) => (
          <button
            key={v.id}
            className={`variant-tab ${v.id === selectedVariantId ? 'active' : ''}`}
            onClick={() => {
              setSelectedVariantId(v.id);
              setActiveFile(v.files[0].path);
            }}
          >
            <div className="label">{v.label}</div>
            <div className="meta">{v.componentName} · {v.visualTone}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function downloadVariantBundle(variant: LwcVariant) {
  // Browser-safe export: zip-free fallback — we emit a single combined .txt index for now,
  // and trigger downloads of each file. Studio export is a developer convenience; the
  // canonical exporter is `pnpm export:demo`.
  for (const file of variant.files) {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.path.split('/').pop() || 'file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
