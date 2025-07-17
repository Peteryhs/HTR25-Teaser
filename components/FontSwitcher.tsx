import React from 'react';

export type FontPreset = 'current' | 'inter' | 'cmd';

interface FontSwitcherProps {
  currentPreset: FontPreset;
  onPresetChange: (preset: FontPreset) => void;
}

const FontSwitcher: React.FC<FontSwitcherProps> = ({ currentPreset, onPresetChange }) => {
  const presets: { value: FontPreset; label: string }[] = [
    { value: 'current', label: 'Current (Charm)' },
    { value: 'inter', label: 'Inter' },
    { value: 'cmd', label: 'Consolas (CMD)' }
  ];

  return (
    <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
      <div className="text-sm font-semibold text-gray-700 mb-2">Font Preset:</div>
      <div className="flex flex-col gap-1">
        {presets.map((preset) => (
          <label key={preset.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="fontPreset"
              value={preset.value}
              checked={currentPreset === preset.value}
              onChange={(e) => onPresetChange(e.target.value as FontPreset)}
              className="text-sky-600"
            />
            <span className="text-sm text-gray-700">{preset.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FontSwitcher;
