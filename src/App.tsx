import React, { useState } from 'react';
import { INDUSTRY_PRESETS } from './presets/industryPresets';
import { ClientConfig } from './types';
import { HeaderBar } from './components/HeaderBar';
import { ConfigEditorDrawer } from './components/ConfigEditorDrawer';
import { LiveWebsitePreview } from './components/LiveWebsitePreview';
import { LeadPilotDashboard } from './components/LeadPilotDashboard';
import { CodeExporterModal } from './components/CodeExporterModal';

export default function App() {
  const [activePresetKey, setActivePresetKey] = useState<string>('hvac');
  const [currentConfig, setCurrentConfig] = useState<ClientConfig>(INDUSTRY_PRESETS['hvac']);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'leadpilot' | 'exporter'>('preview');
  const [appMode, setAppMode] = useState<'development' | 'client'>('development');

  const handleSelectPreset = (presetKey: string) => {
    setActivePresetKey(presetKey);
    if (INDUSTRY_PRESETS[presetKey]) {
      setCurrentConfig(INDUSTRY_PRESETS[presetKey]);
    }
  };

  const handleResetPreset = () => {
    if (INDUSTRY_PRESETS[activePresetKey]) {
      setCurrentConfig(INDUSTRY_PRESETS[activePresetKey]);
    }
  };

  const handleSetAppMode = (mode: 'development' | 'client') => {
    setAppMode(mode);
    if (mode === 'client' && viewMode === 'exporter') {
      setViewMode('leadpilot');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Controller Bar */}
      <HeaderBar
        currentConfig={currentConfig}
        activePresetKey={activePresetKey}
        onSelectPreset={handleSelectPreset}
        onOpenEditor={() => setIsEditorOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        appMode={appMode}
        setAppMode={handleSetAppMode}
      />

      {/* Main Mode Area */}
      <main className="flex-1">
        {viewMode === 'preview' ? (
          <LiveWebsitePreview config={currentConfig} appMode={appMode} />
        ) : viewMode === 'leadpilot' ? (
          <LeadPilotDashboard currentConfig={currentConfig} appMode={appMode} />
        ) : (
          <CodeExporterModal
            config={currentConfig}
            onClose={() => setViewMode('preview')}
          />
        )}
      </main>

      {/* Config Drawer Editor */}
      <ConfigEditorDrawer
        isOpen={isEditorOpen && appMode === 'development'}
        onClose={() => setIsEditorOpen(false)}
        config={currentConfig}
        onChangeConfig={setCurrentConfig}
        onResetPreset={handleResetPreset}
      />
    </div>
  );
}
