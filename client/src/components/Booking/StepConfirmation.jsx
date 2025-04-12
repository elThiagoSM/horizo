import React from "react";
import { motion } from "framer-motion";

const StepConfirmation = ({ servicio, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="text-center space-y-3"
  >
    <p className="text-green-600 text-lg font-medium">
      ✅ ¡Reserva confirmada!
    </p>
    <p className="text-sm text-gray-600">
      {servicio?.modalidad === "Online"
        ? `Tu sesión será virtual. Link: ${servicio.link}`
        : `Dirección: ${servicio.direccion}`}
    </p>
    <p className="text-sm text-gray-500">
      Te notificaremos si se requiere aprobación.
    </p>
    <button
      onClick={onClose}
      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
    >
      Cerrar
    </button>
  </motion.div>
);

export default StepConfirmation;
