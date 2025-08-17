export default function MultiImagePreview({ images, onRemove }) {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((src, index) => (
        <div key={index} className="relative">
          <img
            src={src}
            alt={`Preview ${index + 1}`}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
