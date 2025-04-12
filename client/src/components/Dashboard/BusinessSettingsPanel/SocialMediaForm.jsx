const SocialMediaForm = ({ data, onChange, platforms }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Add Social Media
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Platform
          </label>
          <select
            name="plataforma"
            value={data.plataforma}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="">Select platform</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Link</label>
          <input
            name="enlace"
            value={data.enlace}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialMediaForm;
