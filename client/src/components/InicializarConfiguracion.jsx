import React, { useEffect, useState } from "react";
import axios from "axios";

const InicializarConfiguracion = ({ negocioId }) => {
  const [estado, setEstado] = useState("cargando");
  const [mensaje, setMensaje] = useState("");

  const diasSemana = [0, 1, 2, 3, 4, 5, 6]; // 0: Domingo, 1: Lunes, ..., 6: Sábado

  useEffect(() => {
    const inicializar = async () => {
      try {
        // Crear días laborales (habilitados por defecto: true para L-V, false para S-D)
        const idsDiasLaborales = [];

        for (let dia of diasSemana) {
          const { data } = await axios.post(
            "http://localhost:5000/api/config-reservas/dias-laborales",
            {
              negocio_id: negocioId,
              dia_semana: dia,
              habilitado: dia >= 1 && dia <= 5, // Lunes a Viernes habilitado
            }
          );

          idsDiasLaborales.push(data.id);
        }

        // Crear franja horaria por defecto para cada día laboral
        for (let id of idsDiasLaborales) {
          await axios.post(
            "http://localhost:5000/api/config-reservas/franjas-horarias",
            {
              dia_laboral_id: id,
              hora_inicio: "09:00",
              hora_fin: "13:00",
            }
          );
        }

        setEstado("creado");
        setMensaje("Configuración inicial creada con éxito.");
      } catch (error) {
        console.error(error);
        setEstado("error");
        setMensaje("Hubo un error al inicializar la configuración.");
      }
    };

    if (negocioId) {
      inicializar();
    }
  }, [negocioId]);

  return null;
};

export default InicializarConfiguracion;
