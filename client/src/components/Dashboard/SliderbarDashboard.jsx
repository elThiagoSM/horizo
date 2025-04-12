import {
  FaRegClock,
  FaGlobe,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar({ onNavigate, activeView }) {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    // Eliminar token y datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("negocioId");

    // Redirigir al login
    navigate("/login");
  };

  const menuItems = [
    { key: "home", icon: <FaHome />, label: "Inicio" },
    { key: "page", icon: <FaGlobe />, label: "Página" },
    { key: "schedule", icon: <FaRegClock />, label: "Horario" },
    { key: "services", icon: <FaUsers />, label: "Servicios" },
    { key: "reservations", icon: <FaClipboardList />, label: "Reservas" },
    { key: "settings", icon: <FaCog />, label: "Configuración" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col justify-between fixed h-full">
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaHome className="mr-2" /> Reserva Ahora
        </h2>
        <nav>
          <ul className="space-y-4">
            {menuItems.map(({ key, icon, label }) => (
              <li key={key}>
                <button
                  onClick={() => onNavigate(key)}
                  className={`flex items-center w-full text-left p-2 rounded ${
                    activeView === key ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  {icon} <span className="ml-2">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        onClick={handleCerrarSesion}
        className="flex items-center w-full p-2 mt-4 bg-red-600 hover:bg-red-700 rounded"
      >
        <FaSignOutAlt className="mr-2" /> Cerrar Sesión
      </button>
    </aside>
  );
}

export default Sidebar;
