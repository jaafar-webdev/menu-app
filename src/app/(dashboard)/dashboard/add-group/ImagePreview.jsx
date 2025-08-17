export default function ImagePreview({ src, onRemove }) {
  return (
    <div className="relative">
      <img
        src={src}
        alt="Image Preview"
        className="w-32 h-32 object-cover rounded-lg"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
      >
        X
      </button>
    </div>
  );
}
