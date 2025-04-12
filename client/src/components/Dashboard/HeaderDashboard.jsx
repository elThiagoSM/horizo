function Header({ activeView }) {
  const titles = {
    home: "Inicio",
    page: "Página",
    calendar: "Calendario",
    reservations: "Reservas",
    services: "Servicios",
    settings: "Configuración",
  };

  return (
    <header className="fixed top-0 left-64 right-0 bg-white p-4 shadow z-10 flex justify-between items-center">
      <h1 className="text-3xl font-semibold">
        {titles[activeView] || "Dashboard"}
      </h1>

      <div className="flex items-center space-x-3">
        <span className="text-gray-600 text-sm">Bienvenido, Usuario</span>
        <img
          src="https://placehold.co/200"
          alt="Perfil"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
}

export default Header;
