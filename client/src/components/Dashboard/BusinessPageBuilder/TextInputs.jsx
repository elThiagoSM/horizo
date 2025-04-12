export default function TextInputs({
  title,
  description,
  setTitle,
  setDescription,
}) {
  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribe un título..."
          className="w-full p-2 border rounded-md text-sm"
          maxLength={30}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escribe una descripción..."
          className="w-full p-2 border rounded-md text-sm"
          maxLength={52}
        ></textarea>
      </div>
    </>
  );
}
