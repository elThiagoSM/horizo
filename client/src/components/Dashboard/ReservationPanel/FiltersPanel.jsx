const estados = ["Pendiente", "Aprobada", "Rechazada", "Cancelada"];
const criteriosBusqueda = [
  { label: "Nombre", value: "nombre" },
  { label: "Email", value: "email" },
  { label: "Teléfono", value: "telefono" },
];

const FiltersPanel = ({
  fechaFiltro,
  setFechaFiltro,
  servicioFiltro,
  setServicioFiltro,
  estadoFiltro,
  setEstadoFiltro,
  criterioBusqueda,
  setCriterioBusqueda,
  valorBusqueda,
  setValorBusqueda,
  serviciosDisponibles = [],
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 w-full">
      {/* Select "Buscar por" (más pequeño) */}
      <div className="flex flex-col max-w-[140px] flex-none">
        <label className="block text-sm font-medium mb-1">Buscar por:</label>
        <select
          className="border rounded p-2 text-sm w-full"
          value={criterioBusqueda}
          onChange={(e) => setCriterioBusqueda(e.target.value)}
        >
          {criteriosBusqueda.map((criterio) => (
            <option key={criterio.value} value={criterio.value}>
              {criterio.label}
            </option>
          ))}
        </select>
      </div>

      {/* Input de búsqueda (más grande) */}
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-1 invisible">
          Buscar
        </label>
        <input
          type="text"
          placeholder={`Buscar por ${criterioBusqueda}`}
          className="border rounded p-2 text-sm w-full"
          value={valorBusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
        />
      </div>

      {/* Fecha */}
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Fecha:</label>
        <input
          type="date"
          className="border rounded p-2 text-sm w-full"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </div>

      {/* Servicio */}
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Servicio:</label>
        <select
          className="border rounded p-2 text-sm w-full"
          value={servicioFiltro}
          onChange={(e) => setServicioFiltro(e.target.value)}
        >
          <option value="">Todos</option>
          {serviciosDisponibles.map((servicio) => (
            <option key={servicio} value={servicio}>
              {servicio}
            </option>
          ))}
        </select>
      </div>

      {/* Estado */}
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Estado:</label>
        <select
          className="border rounded p-2 text-sm w-full"
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="">Todos</option>
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltersPanel;
