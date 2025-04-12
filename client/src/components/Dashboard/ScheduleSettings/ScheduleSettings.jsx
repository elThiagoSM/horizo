import React, { useEffect, useState } from "react";
import axios from "axios";

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const ReservationConfiguration = () => {
  const negocioId = localStorage.getItem("negocioId");

  const [diasLaborales, setDiasLaborales] = useState([]);
  const [franjas, setFranjas] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalDiaId, setModalDiaId] = useState(null);
  const [modalFranja, setModalFranja] = useState({
    hora_inicio: "",
    hora_fin: "",
  });
  const [franjasNuevas, setFranjasNuevas] = useState({});
  const [franjasEliminadas, setFranjasEliminadas] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const diasRes = await axios.get(
          `http://localhost:5000/api/config-reservas/dias-laborales/${negocioId}`
        );

        const diasData = diasRes.data;
        const franjasData = {};

        for (const dia of diasData) {
          const res = await axios.get(
            `http://localhost:5000/api/config-reservas/franjas-horarias/${dia.id}`
          );
          franjasData[dia.id] = res.data;
        }

        setDiasLaborales(diasData);
        setFranjas(franjasData);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    if (negocioId) fetchDatos();
  }, [negocioId]);

  const handleDiaChange = (id, value) => {
    setDiasLaborales((prev) =>
      prev.map((d) => (d.id === id ? { ...d, habilitado: value } : d))
    );
  };

  const handleFranjaChange = (diaId, franjaId, field, value) => {
    setFranjas((prev) => ({
      ...prev,
      [diaId]: prev[diaId].map((f) =>
        f.id === franjaId ? { ...f, [field]: value } : f
      ),
    }));
  };

  const handleEliminarFranja = (diaId, franjaId) => {
    setFranjas((prev) => ({
      ...prev,
      [diaId]: prev[diaId].filter((f) => f.id !== franjaId),
    }));
    setFranjasEliminadas((prev) => [...prev, franjaId]);
  };

  const abrirModal = (diaId) => {
    setModalDiaId(diaId);
    setModalFranja({ hora_inicio: "", hora_fin: "" });
    setShowModal(true);
  };

  const agregarFranjaNueva = () => {
    if (!modalFranja.hora_inicio || !modalFranja.hora_fin) return;

    setFranjasNuevas((prev) => ({
      ...prev,
      [modalDiaId]: [
        ...(prev[modalDiaId] || []),
        { ...modalFranja }, // no tiene id, es nueva
      ],
    }));
    setShowModal(false);
  };

  const guardarCambios = async () => {
    try {
      // Actualizar días laborales
      for (const dia of diasLaborales) {
        await axios.put(
          `http://localhost:5000/api/config-reservas/dias-laborales/${dia.id}`,
          { habilitado: dia.habilitado }
        );
      }

      // Actualizar franjas existentes
      for (const [diaId, listaFranjas] of Object.entries(franjas)) {
        for (const franja of listaFranjas) {
          await axios.put(
            `http://localhost:5000/api/config-reservas/franjas-horarias/${franja.id}`,
            {
              hora_inicio: franja.hora_inicio,
              hora_fin: franja.hora_fin,
            }
          );
        }
      }

      // Eliminar franjas
      for (const id of franjasEliminadas) {
        await axios.delete(
          `http://localhost:5000/api/config-reservas/franjas-horarias/${id}`
        );
      }

      // Crear nuevas franjas
      for (const [diaId, nuevas] of Object.entries(franjasNuevas)) {
        for (const franja of nuevas) {
          await axios.post(
            `http://localhost:5000/api/config-reservas/franjas-horarias`,
            {
              dia_laboral_id: diaId,
              hora_inicio: franja.hora_inicio,
              hora_fin: franja.hora_fin,
            }
          );
        }
      }

      alert("Cambios guardados con éxito.");
      window.location.reload(); // opcional para refrescar estado
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Ocurrió un error al guardar.");
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Horario de trabajo de la empresa
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Ajusta tu horario general de trabajo para que cubra todos los horarios
        que vas a tener.
      </p>

      <div className="space-y-4">
        {diasLaborales.map((dia) => (
          <div
            key={dia.id}
            className="bg-white rounded-lg border px-4 py-3 flex flex-col md:flex-row md:items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={dia.habilitado}
                  onChange={(e) => handleDiaChange(dia.id, e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-full transition-transform duration-200"></div>
              </label>
              <span className="font-medium text-lg">
                {diasSemana[dia.dia_semana_id]}
              </span>
            </div>

            {dia.habilitado ? (
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-2 md:mt-0">
                <div className="flex flex-wrap gap-3">
                  {[
                    ...(franjas[dia.id] || []),
                    ...(franjasNuevas[dia.id] || []),
                  ].map((f, i) => (
                    <div
                      key={f.id || `new-${i}`}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="time"
                        value={f.hora_inicio}
                        className="border px-2 py-1 rounded"
                        onChange={(e) =>
                          f.id
                            ? handleFranjaChange(
                                dia.id,
                                f.id,
                                "hora_inicio",
                                e.target.value
                              )
                            : setFranjasNuevas((prev) => ({
                                ...prev,
                                [dia.id]: prev[dia.id].map((fr, idx) =>
                                  idx === i
                                    ? { ...fr, hora_inicio: e.target.value }
                                    : fr
                                ),
                              }))
                        }
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={f.hora_fin}
                        className="border px-2 py-1 rounded"
                        onChange={(e) =>
                          f.id
                            ? handleFranjaChange(
                                dia.id,
                                f.id,
                                "hora_fin",
                                e.target.value
                              )
                            : setFranjasNuevas((prev) => ({
                                ...prev,
                                [dia.id]: prev[dia.id].map((fr, idx) =>
                                  idx === i
                                    ? { ...fr, hora_fin: e.target.value }
                                    : fr
                                ),
                              }))
                        }
                      />
                      {f.id && (
                        <button
                          className="text-red-500 hover:underline text-sm ml-2"
                          onClick={() => handleEliminarFranja(dia.id, f.id)}
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="text-blue-600 hover:underline text-sm mt-2 md:mt-0"
                  onClick={() => abrirModal(dia.id)}
                >
                  + Añadir franja horaria
                </button>
              </div>
            ) : (
              <span className="text-gray-500 text-sm mt-2 md:mt-0">
                Día libre
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={guardarCambios}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Guardar cambios
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Nueva franja horaria</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora inicio
                </label>
                <input
                  type="time"
                  className="border w-full px-2 py-1 rounded"
                  value={modalFranja.hora_inicio}
                  onChange={(e) =>
                    setModalFranja((prev) => ({
                      ...prev,
                      hora_inicio: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora fin
                </label>
                <input
                  type="time"
                  className="border w-full px-2 py-1 rounded"
                  value={modalFranja.hora_fin}
                  onChange={(e) =>
                    setModalFranja((prev) => ({
                      ...prev,
                      hora_fin: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={agregarFranjaNueva}
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationConfiguration;
