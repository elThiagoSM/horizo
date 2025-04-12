import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Loader2,
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Share2,
  CalendarCheck2,
  Clock3,
  XCircle,
  BarChart2,
} from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HomeDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rangoSeleccionado, setRangoSeleccionado] = useState("ultimos_7_dias");
  const negocioId = localStorage.getItem("negocioId");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/dashboard/inicio/${negocioId}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [negocioId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (!data) return <div>Error al cargar los datos.</div>;

  const { bienvenida, actividad, grafico_reservas } = data;

  const datosGrafico = grafico_reservas[rangoSeleccionado] || [];

  const chartData = {
    labels: datosGrafico.map((r) => r.fecha),
    datasets: [
      {
        label: "Aprobadas",
        data: datosGrafico.map((r) => r.total_aprobadas),
        backgroundColor: "#4ade80",
      },
      {
        label: "Canceladas",
        data: datosGrafico.map((r) => r.total_canceladas),
        backgroundColor: "#f87171",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      },
    },
  };

  const botonEstilo =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition";

  return (
    <div className="p-6 space-y-8">
      {/* Bienvenida */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Hola {bienvenida.nombre_usuario}, este es tu panel de{" "}
          <span className="underline">{bienvenida.nombre_negocio}</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Aquí puedes ver un resumen del rendimiento reciente
        </p>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          className={botonEstilo}
          onClick={() => (window.location.href = "/dashboard/pagina")}
        >
          <LayoutDashboard className="w-5 h-5" /> Editar página
        </button>
        <button
          className={botonEstilo}
          onClick={() => (window.location.href = "/dashboard/calendario")}
        >
          <CalendarDays className="w-5 h-5" /> Ver calendario
        </button>
        <button
          className={botonEstilo}
          onClick={() => (window.location.href = "/dashboard/servicios")}
        >
          <PlusCircle className="w-5 h-5" /> Agregar servicio
        </button>
        <button
          className={botonEstilo}
          onClick={() => (window.location.href = "/dashboard/social")}
        >
          <Share2 className="w-5 h-5" /> Redes sociales
        </button>
      </div>

      {/* Grid de Actividad + Gráfico */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Actividad */}
        <div className="bg-white dark:bg-muted rounded-2xl shadow p-6 border">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
            <CalendarDays className="w-6 h-6 text-blue-500" />
            Actividad reciente
          </h2>

          {/* Tabla comparativa */}
          <div className="overflow-x-auto">
            <table className="w-full text-base text-left border-collapse">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="py-3 pr-4">Métrica</th>
                  <th className="py-3 pr-4">Este mes</th>
                  <th className="py-3 pr-4">Mes pasado</th>
                  <th className="py-3 pr-4 text-center">Cambio</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  {
                    label: "Reservas totales",
                    actual: actividad.reservas_mes,
                    pasado: actividad.reservas_mes_pasado,
                  },
                  {
                    label: "Aprobadas",
                    actual: actividad.aprobadas_mes,
                    pasado: actividad.aprobadas_mes_pasado,
                  },
                  {
                    label: "Canceladas",
                    actual: actividad.canceladas_mes,
                    pasado: actividad.canceladas_mes_pasado,
                  },
                  {
                    label: "Rechazadas",
                    actual: actividad.rechazadas_mes,
                    pasado: actividad.rechazadas_mes_pasado,
                  },
                  {
                    label: "Promedio diario",
                    actual: actividad.promedio_diario_mes,
                    pasado: actividad.promedio_diario_mes_pasado,
                  },
                ].map(({ label, actual = 0, pasado = 0, prefix = "" }, idx) => {
                  const mejora = actual > pasado;
                  const empeora = actual < pasado;
                  const igual = actual === pasado;
                  return (
                    <tr key={idx}>
                      <td className="py-2 pr-4 font-medium">{label}</td>
                      <td className="py-2 pr-4">
                        {prefix}
                        {actual}
                      </td>
                      <td className="py-2 pr-4">
                        {prefix}
                        {pasado}
                      </td>
                      <td className="py-2 pr-4 text-center">
                        {mejora && (
                          <span className="text-green-600 font-semibold">
                            ▲{" "}
                            {(
                              ((actual - pasado) / (pasado || 1)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        )}
                        {empeora && (
                          <span className="text-red-600 font-semibold">
                            ▼{" "}
                            {(
                              ((pasado - actual) / (pasado || 1)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        )}
                        {igual && <span className="text-gray-500">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Indicadores visuales */}
          <div className="flex justify-center gap-6 text-lg mt-4">
            <span className="text-green-600 flex items-center gap-2 font-semibold">
              <CalendarCheck2 className="w-5 h-5" />
              {actividad.total_aprobadas || 0}
            </span>
            <span className="text-yellow-600 flex items-center gap-2 font-semibold">
              <Clock3 className="w-5 h-5" />
              {actividad.total_pendientes || 0}
            </span>
            <span className="text-red-600 flex items-center gap-2 font-semibold">
              <XCircle className="w-5 h-5" />
              {actividad.total_canceladas || 0}
            </span>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white dark:bg-muted rounded-2xl shadow p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-purple-500" />
              Historial de reservas
            </h2>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={rangoSeleccionado}
              onChange={(e) => setRangoSeleccionado(e.target.value)}
            >
              <option value="ultimos_7_dias">Últimos 7 días</option>
              <option value="ultimos_15_dias">Últimos 15 días</option>
              <option value="ultimo_mes">Último mes</option>
              <option value="ultimos_6_meses">Últimos 6 meses</option>
              <option value="ultimo_anio">Último año</option>
            </select>
          </div>
          <div className="w-full h-72">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
