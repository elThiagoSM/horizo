const PageConfigurationForm = ({ data, onChange, palettes }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Page Configuration
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Color Palette</label>
          <select
            name="paleta_color_id"
            value={data.paleta_color_id || ""}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="">Select palette</option>
            {palettes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} ({p.color_principal})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="mostrar_marca_agua"
            checked={data.mostrar_marca_agua}
            onChange={handleChange}
          />
          <label>Show watermark</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="colores_personalizados_activados"
            checked={data.colores_personalizados_activados}
            onChange={handleChange}
          />
          <label>Custom colors</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Primary Color", name: "color_personalizado_primario" },
            { label: "Text Color", name: "color_personalizado_texto" },
            { label: "Button Color", name: "color_personalizado_boton" },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm font-semibold">{label}</label>
              <input
                name={name}
                value={data[name] || ""}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageConfigurationForm;
