import React from "react";

const modalidades = ["presencial", "virtual", "mixta"];

const duraciones = [
  "5min",
  "10min",
  "15min",
  "20min",
  "30min",
  "45min",
  "1h",
  "1h 15min",
  "1h 30min",
  "1h 45min",
  "2h",
  "2h 30min",
  "3h",
  "4h",
  "5h",
  "6h",
  "7h",
  "8h",
];

const espacios = [
  "0min",
  "5min",
  "10min",
  "15min",
  "20min",
  "30min",
  "45min",
  "1h",
  "1h 30min",
  "2h",
  "3h",
];

const textoAMinutos = {
  "0min": 0,
  "5min": 5,
  "10min": 10,
  "15min": 15,
  "20min": 20,
  "30min": 30,
  "45min": 45,
  "1h": 60,
  "1h 15min": 75,
  "1h 30min": 90,
  "1h 45min": 105,
  "2h": 120,
  "2h 30min": 150,
  "3h": 180,
  "4h": 240,
  "5h": 300,
  "6h": 360,
  "7h": 420,
  "8h": 480,
};

const minutosATexto = Object.entries(textoAMinutos).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

const ServiceForm = ({
  form,
  handleChange,
  guardarServicio,
  resetForm,
  editando,
  negocioId,
}) => {
  const handleSubmit = () => {
    const servicioData = {
      negocio_id: negocioId,
      nombre: form.nombre,
      descripcion: form.descripcion,
      duracion_minutos: textoAMinutos[form.duracion] || 30,
      espacio_entre_turnos: textoAMinutos[form.espacioEntreTurnos] ?? 0,
      precio: parseFloat(form.precio) || 0,
      modalidad: form.modalidad,
      plataforma_virtual_id: form.plataformaVirtualId || null,
      ubicacion_presencial_id: form.ubicacionPresencialId || null,
      limite_por_dia: parseInt(form.limitePorDia) || 0,
      permitir_multiples_por_dia: form.multiplePorDia || false,
      disponibilidad_individual: form.disponibilidadPersonalizada || false,
      requiere_aprobacion: form.requiereAprobacion || false,
      permitir_cancelacion_cliente: form.permitirCancelacionCliente || false,
      formulario_personalizado: form.formularioPro || false,
      enviar_recordatorio_email: form.enviarRecordatorioEmail || false,
      recordatorio_1_dia_antes: form.recordatorio1DiaAntes || false,
      recordatorio_1_hora_antes: form.recordatorio1HoraAntes || false,
    };

    guardarServicio(servicioData);
  };

  return (
    <div className="p-8 rounded-2xl space-y-6">
      <h3 className="text-2xl font-semibold mb-4">
        {editando ? "✏️ Editar Servicio" : "➕ Crear Servicio"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Corte de pelo"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <input
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Breve descripción del servicio"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duración</label>
          <select
            name="duracion"
            value={form.duracion}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {duraciones.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Espacio entre turnos
          </label>
          <select
            name="espacioEntreTurnos"
            value={form.espacioEntreTurnos}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {espacios.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            placeholder="Ej: 1500"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Modalidad</label>
          <select
            name="modalidad"
            value={form.modalidad}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {modalidades.map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Plataforma Virtual ID
          </label>
          <input
            name="plataformaVirtualId"
            value={form.plataformaVirtualId || ""}
            onChange={handleChange}
            placeholder="Ej: 1"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Ubicación Presencial ID
          </label>
          <input
            name="ubicacionPresencialId"
            value={form.ubicacionPresencialId || ""}
            onChange={handleChange}
            placeholder="Ej: 2"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Límite de reservas por día
          </label>
          <input
            type="number"
            name="limitePorDia"
            value={form.limitePorDia}
            onChange={handleChange}
            placeholder="Ej: 5"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="pt-4">
        <h4 className="text-md font-semibold mb-2">Opciones avanzadas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              name: "multiplePorDia",
              label: "Permitir múltiples reservas por día",
            },
            {
              name: "disponibilidadPersonalizada",
              label: "Disponibilidad individual",
            },
            { name: "formularioPro", label: "Formulario personalizado" },
            {
              name: "requiereAprobacion",
              label: "Requiere aprobación del negocio",
            },
            {
              name: "permitirCancelacionCliente",
              label: "Permitir cancelación del cliente",
            },
            {
              name: "enviarRecordatorioEmail",
              label: "Enviar recordatorio por email",
            },
            {
              name: "recordatorio1DiaAntes",
              label: "Recordatorio 1 día antes",
            },
            {
              name: "recordatorio1HoraAntes",
              label: "Recordatorio 1 hora antes",
            },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={name}
                checked={form[name]}
                onChange={handleChange}
                className="w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editando ? "Guardar cambios" : "Crear servicio"}
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;
