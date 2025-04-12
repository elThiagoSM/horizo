import { format } from "date-fns";

const DetalleModal = ({ cita, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 className="text-lg font-bold mb-3">👤 Detalles del Cliente</h3>
      <p>
        <strong>Nombre:</strong> {cita.cliente}
      </p>
      <p>
        <strong>Email:</strong> {cita.contacto}
      </p>
      <p>
        <strong>Teléfono:</strong> {cita.telefono}
      </p>
      <p>
        <strong>Servicio:</strong> {cita.servicio}
      </p>
      <p>
        <strong>Fecha:</strong> {format(new Date(cita.fecha), "dd/MM/yyyy")} a
        las {cita.hora}
      </p>
      {cita.notas && (
        <p>
          <strong>Notas:</strong> {cita.notas}
        </p>
      )}
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Cerrar
      </button>
    </div>
  </div>
);

export default DetalleModal;
