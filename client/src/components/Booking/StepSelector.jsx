import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { motion } from "framer-motion";

const StepSelector = ({ dia, setDia, onNext }) => {
  const hoy = new Date();

  const diasHabilitados = {
    fromDate: hoy,
    toDate: new Date(hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate()),
    // Por ejemplo: solo habilitar lunes a sábados
    filter: (date) => {
      const day = date.getDay();
      return day !== 0; // Domingo bloqueado
    },
  };

  const handleSeleccion = (date) => {
    if (date) setDia(format(date, "yyyy-MM-dd"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <label className="block text-sm mb-1 font-medium text-gray-700">
        Seleccioná un día disponible:
      </label>

      <DayPicker
        mode="single"
        selected={dia ? new Date(dia) : undefined}
        onSelect={handleSeleccion}
        fromDate={diasHabilitados.fromDate}
        toDate={diasHabilitados.toDate}
        modifiers={{
          disabled: [
            { dayOfWeek: [0] }, // domingos
            { before: hoy },
          ],
        }}
        locale={es}
        className="border rounded-lg shadow-sm"
      />

      <button
        onClick={onNext}
        disabled={!dia}
        className={`w-full py-2 rounded-md transition ${
          dia
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Siguiente
      </button>
    </motion.div>
  );
};

export default StepSelector;
