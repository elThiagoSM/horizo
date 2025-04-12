export default function ImageUploader({ handleImageUpload }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">Imagen</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border rounded-md p-2 text-sm cursor-pointer"
      />
    </div>
  );
}
