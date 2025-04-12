const BusinessHeader = ({ logo, onInicioClick, onContactoClick }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-600 shadow">
      <div className="max-w-6xl w-full m-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo negocio"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        <nav className="space-x-6">
          <button
            onClick={onInicioClick}
            className="text-white hover:text-blue-600 text-xl cursor-pointer"
          >
            Inicio
          </button>
          <button className="text-white hover:text-blue-600 text-xl cursor-pointer">
            Reseñas
          </button>
          <button
            onClick={onContactoClick}
            className="text-white hover:text-blue-600 text-xl cursor-pointer"
          >
            Contacto
          </button>
        </nav>
      </div>
    </header>
  );
};

export default BusinessHeader;
