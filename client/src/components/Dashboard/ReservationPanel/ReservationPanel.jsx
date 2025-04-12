import React, { useEffect, useState } from "react";
import { parse } from "date-fns";
import FiltersPanel from "./FiltersPanel";
import CitasTable from "./CitasTable";
import DetalleModal from "./DetalleModal";
import ConfirmModal from "./ConfirmModal";

const ReservationPanel = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Pendiente");
  const [servicioFiltro, setServicioFiltro] = useState("");
  const [detalleCita, setDetalleCita] = useState(null);
  const [modalInfo, setModalInfo] = useState(null);
  const [criterioBusqueda, setCriterioBusqueda] = useState("nombre");
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);

  const negocioId = 1;

  useEffect(() => {
    const fetchReservas = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/dashboard/reservas/${negocioId}/negocios`
        );
        const data = await response.json();

        if (response.ok) {
          const citasAdaptadas = data.map((r) => ({
            id: r.id,
            cliente: `${r.cliente_nombre} ${r.cliente_apellido}`,
            servicio: r.servicio_nombre,
            fecha: r.fecha,
            hora: r.hora,
            estado: r.estado,
            contacto: r.cliente_email,
            telefono: r.cliente_telefono,
            notas: r.nota,
          }));

          setCitas(citasAdaptadas);

          // Extraer servicios únicos
          const serviciosUnicos = [
            ...new Set(citasAdaptadas.map((cita) => cita.servicio)),
          ];
          setServiciosDisponibles(serviciosUnicos);
        } else {
          console.error("Error cargando reservas:", data.message || data.error);
        }
      } catch (err) {
        console.error("Error al conectar con la API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [negocioId]);

  const handleEstado = async () => {
    const { cita, nuevoEstado } = modalInfo;

    try {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/reservas/${cita.id}/estado`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setCitas((prev) =>
          prev.map((c) =>
            c.id === cita.id ? { ...c, estado: nuevoEstado } : c
          )
        );
      } else {
        alert(data.message || "No se pudo actualizar el estado");
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el estado");
    } finally {
      setModalInfo(null);
    }
  };

  const eliminarReserva = async (reservaId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/dashboard/reservas/${reservaId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (response.ok) {
        setCitas((prev) => prev.filter((cita) => cita.id !== reservaId));
      } else {
        alert(data.message || data.error || "No se pudo eliminar la reserva");
      }
    } catch (err) {
      console.error("Error al eliminar reserva:", err);
      alert("Error al eliminar la reserva");
    }
  };

  // Ordenar citas por fecha y hora ascendente
  const citasOrdenadas = [...citas].sort((a, b) => {
    const fechaA = parse(
      `${a.fecha} ${a.hora}`,
      "dd/MM/yyyy HH:mm",
      new Date()
    );
    const fechaB = parse(
      `${b.fecha} ${b.hora}`,
      "dd/MM/yyyy HH:mm",
      new Date()
    );
    return fechaA - fechaB;
  });

  const citasFiltradas = citasOrdenadas.filter((cita) => {
    const matchFecha = !fechaFiltro || cita.fecha.startsWith(fechaFiltro);
    const matchEstado =
      !estadoFiltro || cita.estado.toLowerCase() === estadoFiltro.toLowerCase();
    const matchServicio =
      !servicioFiltro ||
      cita.servicio.toLowerCase().includes(servicioFiltro.toLowerCase());

    const valor = valorBusqueda.toLowerCase();

    const matchBusqueda =
      !valor ||
      (criterioBusqueda === "nombre" &&
        cita.cliente.toLowerCase().includes(valor)) ||
      (criterioBusqueda === "email" &&
        cita.contacto.toLowerCase().includes(valor)) ||
      (criterioBusqueda === "telefono" &&
        cita.telefono.toLowerCase().includes(valor));

    return matchFecha && matchEstado && matchServicio && matchBusqueda;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📆 Lista de Citas</h2>

      <FiltersPanel
        fechaFiltro={fechaFiltro}
        setFechaFiltro={setFechaFiltro}
        servicioFiltro={servicioFiltro}
        setServicioFiltro={setServicioFiltro}
        estadoFiltro={estadoFiltro}
        setEstadoFiltro={setEstadoFiltro}
        criterioBusqueda={criterioBusqueda}
        setCriterioBusqueda={setCriterioBusqueda}
        valorBusqueda={valorBusqueda}
        setValorBusqueda={setValorBusqueda}
        serviciosDisponibles={serviciosDisponibles}
      />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Cargando citas...</div>
      ) : (
        <CitasTable
          citas={citasFiltradas}
          onVerDetalle={setDetalleCita}
          onAccion={(cita, nuevoEstado) => setModalInfo({ cita, nuevoEstado })}
        />
      )}

      {detalleCita && (
        <DetalleModal cita={detalleCita} onClose={() => setDetalleCita(null)} />
      )}

      <ConfirmModal
        open={!!modalInfo}
        mensaje={`¿Seguro que deseas marcar esta reserva como ${modalInfo?.nuevoEstado}?`}
        onCancel={() => setModalInfo(null)}
        onConfirm={handleEstado}
      />
    </div>
  );
};

export default ReservationPanel;
