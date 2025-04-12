import { useState } from "react";

export default function SocialModal({ platform, value, onClose, onSave }) {
  const [inputValue, setInputValue] = useState(value || "");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">
          Editar link de {platform}
        </h2>
        <input
          type="text"
          placeholder={`Usuario de ${platform}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border rounded-md text-sm mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(inputValue)}
            className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
