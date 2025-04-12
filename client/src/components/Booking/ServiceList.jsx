import React from "react";
import ServiceCard from "./ServiceCard";

const ServiceList = ({ servicios, onReservar }) => {
  return (
    <section className="flex justify-between p-12">
      <div className="max-w-6xl w-full m-auto flex flex-col justify-between items-center">
        <h2 className="text-3xl font-bold text-white mb-6">SERVICIOS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              servicio={servicio}
              onReservar={onReservar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
