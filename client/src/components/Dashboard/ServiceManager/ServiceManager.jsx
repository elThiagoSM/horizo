import React, { useState, useEffect } from "react";
import ServiceForm from "./ServiceForm";
import ServiceTable from "./ServiceTable";
import axios from "axios";

const ServiceManager = () => {
  const [servicios, setServicios] = useState([]);
  const negocioId = localStorage.getItem("negocioId");

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    duracion: "30min",
    precio: "",
    modalidad: "presencial",
    espacioEntreTurnos: "",
    multiplePorDia: false,
    disponibilidadPersonalizada: false,
    limitePorDia: "",
    formularioPro: false,
    requiereAprobacion: false,
    permitirCancelacionCliente: false,
    enviarRecordatorioEmail: false,
    recordatorio1DiaAntes: false,
    recordatorio1HoraAntes: false,
    plataformaVirtualId: "",
    ubicacionPresencialId: "",
  });

  const [editando, setEditando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const fetchServicios = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/servicios/${negocioId}`
      );
      setServicios(res.data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
      duracion: "30min",
      precio: "",
      modalidad: "presencial",
      espacioEntreTurnos: "",
      multiplePorDia: false,
      disponibilidadPersonalizada: false,
      limitePorDia: "",
      formularioPro: false,
      requiereAprobacion: false,
      permitirCancelacionCliente: false,
      enviarRecordatorioEmail: false,
      recordatorio1DiaAntes: false,
      recordatorio1HoraAntes: false,
      plataformaVirtualId: "",
      ubicacionPresencialId: "",
    });
    setEditando(false);
    setModalAbierto(false);
  };

  const guardarServicio = async (data) => {
    try {
      if (editando) {
        await axios.put(`http://localhost:5000/api/servicios/${form.id}`, data);
      } else {
        await axios.post("http://localhost:5000/api/servicios", data);
      }
      await fetchServicios();
      resetForm();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
    }
  };

  const editarServicio = (servicio) => {
    setForm({
      id: servicio.id,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      duracion: `${servicio.duracion_minutos}min`,
      precio: servicio.precio,
      modalidad: servicio.modalidad,
      espacioEntreTurnos: servicio.espacio_entre_turnos?.toString() || "",
      multiplePorDia: servicio.permitir_multiples_por_dia,
      disponibilidadPersonalizada: servicio.disponibilidad_individual,
      limitePorDia: servicio.limite_por_dia?.toString() || "",
      formularioPro: servicio.formulario_personalizado,
      requiereAprobacion: servicio.requiere_aprobacion,
      permitirCancelacionCliente: servicio.permitir_cancelacion_cliente,
      enviarRecordatorioEmail: servicio.enviar_recordatorio_email,
      recordatorio1DiaAntes: servicio.recordatorio_1_dia_antes,
      recordatorio1HoraAntes: servicio.recordatorio_1_hora_antes,
      plataformaVirtualId: servicio.plataforma_virtual_id || "",
      ubicacionPresencialId: servicio.ubicacion_presencial_id || "",
    });
    setEditando(true);
    setModalAbierto(true);
  };

  const eliminarServicio = async (id) => {
    if (confirm("¿Seguro que querés eliminar este servicio?")) {
      try {
        await axios.delete(`http://localhost:5000/api/servicios/${id}`);
        await fetchServicios();
      } catch (error) {
        console.error("Error al eliminar servicio:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🧾 Servicios Disponibles</h2>

      <ServiceTable
        servicios={servicios}
        editarServicio={editarServicio}
        eliminarServicio={eliminarServicio}
      />

      <button
        onClick={() => setModalAbierto(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-lg w-14 h-14 text-3xl flex items-center justify-center hover:bg-blue-700"
      >
        +
      </button>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl cursor-pointer"
            >
              &times;
            </button>
            <ServiceForm
              form={form}
              handleChange={handleChange}
              guardarServicio={guardarServicio}
              resetForm={resetForm}
              editando={editando}
              negocioId={negocioId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
