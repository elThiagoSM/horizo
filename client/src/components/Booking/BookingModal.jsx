import React from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import StepSelector from "./StepSelector";
import StepTimeSelector from "./StepTimeSelector";
import StepClientForm from "./StepClientForm";
import StepConfirmation from "./StepConfirmation";

const pasosLabels = ["Elegir día", "Elegir hora", "Datos", "Confirmación"];

const BookingModal = ({
  abierto,
  onClose,
  paso,
  setPaso,
  servicio,
  dia,
  setDia,
  hora,
  setHora,
  datosCliente,
  setDatosCliente,
  errores,
  setErrores,
  cargando,
  setCargando,
}) => {
  return (
    <Dialog open={abierto} onClose={onClose}>
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <Dialog.Panel className="relative bg-white rounded-xl max-w-md w-full p-6 z-10 shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">
            Reservá: {servicio?.nombre}
          </h2>
          <div className="flex justify-between text-sm mb-4 text-gray-500">
            {pasosLabels.map((label, i) => (
              <div
                key={i}
                className={`flex-1 text-center ${
                  i + 1 === paso
                    ? "text-blue-600 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {paso === 1 && (
              <StepSelector
                key="paso1"
                dia={dia}
                setDia={setDia}
                onNext={() => setPaso(2)}
              />
            )}
            {paso === 2 && (
              <StepTimeSelector
                key="paso2"
                hora={hora}
                setHora={setHora}
                duracion={servicio?.duracion}
                onBack={() => setPaso(1)}
                onNext={() => setPaso(3)}
              />
            )}
            {paso === 3 && (
              <StepClientForm
                key="paso3"
                datos={datosCliente}
                setDatos={setDatosCliente}
                errores={errores}
                setErrores={setErrores}
                onBack={() => setPaso(2)}
                onConfirm={() => setPaso(4)}
                cargando={cargando}
                setCargando={setCargando}
              />
            )}
            {paso === 4 && (
              <StepConfirmation
                key="paso4"
                servicio={servicio}
                onClose={onClose}
              />
            )}
          </AnimatePresence>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BookingModal;
