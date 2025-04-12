const BusinessInfoForm = ({ data, onChange, businessTypes }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Business Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Name", name: "nombre" },
          { label: "Slogan", name: "eslogan" },
          { label: "Description", name: "descripcion" },
          { label: "Slug URL", name: "slug_url" },
          { label: "Address", name: "direccion" },
          { label: "City", name: "ciudad" },
          { label: "Province", name: "provincia" },
          { label: "Country", name: "pais" },
          { label: "Logo URL", name: "logo_url" },
        ].map(({ label, name }) => (
          <div key={name} className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              {label}
            </label>
            <input
              name={name}
              value={data[name] || ""}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Business Type
          </label>
          <select
            name="tipo_negocio_id"
            value={data.tipo_negocio_id}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="">Select type</option>
            {businessTypes.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfoForm;
