import React from "react";

const ServiceCard = ({ servicio, onReservar }) => {
  return (
    <div className="rounded-lg p-5 transition bg-white">
      <h3 className="text-xl font-semibold mb-1">{servicio.nombre}</h3>
      <p className="text-gray-600 text-sm mb-2">{servicio.descripcion}</p>
      <p className="text-gray-500 text-sm">
        {servicio.duracion} min · ${servicio.precio}
      </p>
      <p className="text-gray-500 text-sm mb-4">
        Modalidad: {servicio.modalidad}
      </p>
      <button
        onClick={() => onReservar(servicio)}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Reservar
      </button>
    </div>
  );
};

export default ServiceCard;
