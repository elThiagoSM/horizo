import { format } from "date-fns";
import ActionButtons from "./ActionButtons";

const StatusBadge = ({ estado }) => {
  const normalized =
    estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();

  const colorMap = {
    pendiente: "bg-yellow-100 text-yellow-700",
    aprobada: "bg-green-100 text-green-700",
    rechazada: "bg-red-100 text-red-700",
    cancelada: "bg-gray-200 text-gray-600",
  };

  const color = colorMap[estado.toLowerCase()] || "bg-gray-100 text-gray-600";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {normalized}
    </span>
  );
};

const CitaRow = ({ cita, onAccion, onVerDetalle }) => (
  <tr className="border-t hover:bg-gray-50">
    <td className="p-3">
      <div className="font-semibold">{cita.cliente}</div>
      <div className="text-xs text-gray-500">
        {cita.contacto} · {cita.telefono}
      </div>
      {cita.notas && <div className="text-xs italic mt-1">📝 {cita.notas}</div>}
    </td>
    <td className="p-3">{cita.servicio}</td>
    <td className="p-3">{format(new Date(cita.fecha), "dd/MM/yyyy")}</td>
    <td className="p-3">{cita.hora}</td>
    <td className="p-3">
      <StatusBadge estado={cita.estado} />
    </td>
    <td className="p-3">
      <ActionButtons
        cita={cita}
        onAccion={onAccion}
        onVerDetalle={onVerDetalle}
      />
    </td>
  </tr>
);

export default CitaRow;
