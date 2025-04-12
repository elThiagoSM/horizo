import { FiEdit, FiTrash2 } from "react-icons/fi";

const formatearDuracion = (minutos) => {
  if (!minutos) return "—";
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  if (horas && mins) return `${horas}h ${mins}min`;
  if (horas) return `${horas}h`;
  return `${mins}min`;
};

const ServiceTable = ({ servicios, editarServicio, eliminarServicio }) => (
  <div className="overflow-x-auto shadow border rounded-lg">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 uppercase">
        <tr>
          <th className="p-3">Nombre</th>
          <th className="p-3">Duración</th>
          <th className="p-3">Modalidad</th>
          <th className="p-3">Precio</th>
          <th className="p-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {servicios.map((s) => (
          <tr key={s.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{s.nombre}</td>
            <td className="p-3">{formatearDuracion(s.duracion_minutos)}</td>
            <td className="p-3 capitalize">{s.modalidad}</td>
            <td className="p-3">{s.precio ? `$${s.precio}` : "—"}</td>
            <td className="p-3">
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => editarServicio(s)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => eliminarServicio(s.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {servicios.length === 0 && (
          <tr>
            <td colSpan="5" className="p-4 text-center text-gray-500">
              No hay servicios aún.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ServiceTable;
