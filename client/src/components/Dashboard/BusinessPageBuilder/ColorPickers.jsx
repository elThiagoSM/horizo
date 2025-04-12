export default function ColorPickers({
  primaryColor,
  textColor,
  buttonColor,
  setPrimaryColor,
  setTextColor,
  setButtonColor,
  canEditColors = false,
}) {
  return (
    <div className="flex flex-col mb-6">
      <div className="flex justify-between mb-2">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Color principal
          </label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            disabled={!canEditColors}
            className={`w-full h-10 cursor-pointer border rounded-md ${
              !canEditColors ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>
        <div className="w-full mx-4">
          <label className="block text-sm font-medium mb-1">
            Texto de botones
          </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            disabled={!canEditColors}
            className={`w-full h-10 cursor-pointer border rounded-md ${
              !canEditColors ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Fondo de botones
          </label>
          <input
            type="color"
            value={buttonColor}
            onChange={(e) => setButtonColor(e.target.value)}
            disabled={!canEditColors}
            className={`w-full h-10 cursor-pointer border rounded-md ${
              !canEditColors ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>
      {!canEditColors && (
        <p className="text-sm text-gray-500 text-center">
          Personalizar colores está disponible solo en planes premium.
        </p>
      )}
    </div>
  );
}
