import React from "react";
import { motion } from "framer-motion";

const generarHorarios = (duracion) => {
  const horarios = [];
  const inicio = 9;
  const fin = 18;
  for (let h = inicio; h < fin; h++) {
    horarios.push(`${h}:00`);
    if (duracion <= 30) horarios.push(`${h}:30`);
  }
  return horarios;
};

const StepTimeSelector = ({ hora, setHora, duracion, onBack, onNext }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
  >
    <label className="block text-sm mb-2 font-medium">Elegí un horario:</label>
    <select
      className="w-full border px-4 py-2 rounded-md"
      value={hora}
      onChange={(e) => setHora(e.target.value)}
    >
      <option value="">-- Seleccioná --</option>
      {generarHorarios(duracion).map((h) => (
        <option key={h} value={h}>
          {h}
        </option>
      ))}
    </select>
    <div className="flex justify-between mt-4">
      <button onClick={onBack} className="text-gray-600 underline">
        ← Atrás
      </button>
      <button
        onClick={onNext}
        disabled={!hora}
        className={`px-4 py-2 rounded-md transition ${
          hora
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Siguiente
      </button>
    </div>
  </motion.div>
);

export default StepTimeSelector;
