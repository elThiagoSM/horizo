import CitaRow from "./CitaRow";

const CitasTable = ({ citas, onAccion, onVerDetalle }) => {
  if (citas.length === 0) {
    return (
      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="w-full text-sm text-left">
          <tbody>
            <tr>
              <td colSpan="6" className="text-center p-5 text-gray-500">
                No hay citas con esos filtros.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow border rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="p-3">Cliente</th>
            <th className="p-3">Servicio</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Hora</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <CitaRow
              key={cita.id}
              cita={cita}
              onAccion={onAccion}
              onVerDetalle={onVerDetalle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitasTable;
