import React from "react";

const BusinessInfoSection = ({ horarios, sobreNosotros }) => {
  return (
    <section className="pt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Horarios */}
        <div className="md:col-span-1 bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Horarios</h3>
          <ul className="text-gray-700 space-y-2">
            {horarios.map(([day, time]) => (
              <li key={day} className="flex">
                <span className="font-bold w-12">{day}</span>
                <span className="ml-4">{time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sobre nosotros */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Sobre nosotros
          </h3>
          <p className="text-gray-700 leading-relaxed">{sobreNosotros}</p>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfoSection;
