import { FaPlus, FaTrash } from "react-icons/fa";

export default function ButtonList({
  buttons,
  addButton,
  removeButton,
  updateButton,
  buttonLimit = 6,
}) {
  const canAddMore = buttons.length < buttonLimit;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2">Botones</h3>
      {buttons.map((button, index) => (
        <div key={index} className="flex gap-2 items-center mb-3">
          <input
            type="text"
            placeholder="Título"
            value={button.title}
            onChange={(e) => updateButton(index, "title", e.target.value)}
            className="w-2/5 p-3 border rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Enlace"
            value={button.link}
            onChange={(e) => updateButton(index, "link", e.target.value)}
            className="w-3/5 p-3 border rounded-md text-sm"
          />
          <button
            onClick={() => removeButton(index)}
            className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {canAddMore ? (
        <button
          onClick={addButton}
          className="mt-2 flex items-center gap-2 px-4 py-3 bg-gray-200 text-sm rounded-md hover:bg-gray-300 w-full justify-center cursor-pointer transition-colors"
        >
          <FaPlus /> Agregar botón
        </button>
      ) : (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Has alcanzado el límite de {buttonLimit} botones.
        </p>
      )}
    </div>
  );
}
