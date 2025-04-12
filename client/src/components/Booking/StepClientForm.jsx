import React from "react";
import { motion } from "framer-motion";

const StepClientForm = ({
  datos,
  setDatos,
  errores,
  setErrores,
  onBack,
  onConfirm,
  cargando,
  setCargando,
}) => {
  const validar = () => {
    const errs = {};
    if (!datos.nombre) errs.nombre = "Nombre requerido";
    if (!datos.email || !datos.email.includes("@"))
      errs.email = "Email válido requerido";
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const confirmar = () => {
    if (!validar()) return;
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      onConfirm();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-3"
    >
      <input
        type="text"
        placeholder="Nombre completo"
        className="w-full border px-4 py-2 rounded-md"
        value={datos.nombre}
        onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
      />
      {errores.nombre && (
        <p className="text-red-500 text-sm">{errores.nombre}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded-md"
        value={datos.email}
        onChange={(e) => setDatos({ ...datos, email: e.target.value })}
      />
      {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}

      <input
        type="text"
        placeholder="Teléfono (opcional)"
        className="w-full border px-4 py-2 rounded-md"
        value={datos.telefono}
        onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
      />
      <textarea
        placeholder="Notas para el proveedor (opcional)"
        className="w-full border px-4 py-2 rounded-md"
        value={datos.notas}
        onChange={(e) => setDatos({ ...datos, notas: e.target.value })}
      />
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="text-gray-600 underline">
          ← Atrás
        </button>
        <button
          onClick={confirmar}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
          disabled={cargando}
        >
          {cargando ? "Procesando..." : "Confirmar reserva"}
        </button>
      </div>
    </motion.div>
  );
};

export default StepClientForm;
