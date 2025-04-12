export default function ColorPresets({ presets, applyPreset }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">Paletas</label>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="px-3 py-1 rounded-md text-sm border hover:shadow cursor-pointer transition-shadow"
            style={{
              backgroundColor: preset.primary,
              color: preset.text,
            }}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}
