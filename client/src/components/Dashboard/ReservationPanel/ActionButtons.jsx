// components/ActionButtons.jsx
import React from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";

const ActionButtons = ({ cita, onAccion, onVerDetalle }) => {
  return (
    <div className="flex items-center space-x-4 text-lg">
      {cita.estado === "pendiente" && (
        <>
          <button
            className="text-green-600 hover:text-green-800"
            onClick={() => onAccion(cita, "aprobada")}
            title="Aprobar"
          >
            <FiCheck />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => onAccion(cita, "rechazada")}
            title="Rechazar"
          >
            <FiX />
          </button>
        </>
      )}
      <button
        className="text-blue-600 hover:text-blue-800"
        onClick={() => onVerDetalle(cita)}
        title="Ver detalle"
      >
        <FiEye />
      </button>
    </div>
  );
};

export default ActionButtons;
