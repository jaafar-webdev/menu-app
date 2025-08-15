export default function ProductActions({
  quantity,
  setQuantity,
  total,
  currency,
  onAdd,
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-t p-4 bg-gray-50">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-8 h-8 rounded-md  text-lg font-bold flex items-center justify-center border-2 border-gray-400 text-gray-400"
          aria-label="تقليل الكمية"
        >
          -
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="w-8 h-8 rounded-md  text-lg font-bold flex items-center justify-center border-2 border-gray-400 text-gray-400"
          aria-label="زيادة الكمية"
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="mt-1 px-4  bg-primary text-white rounded-lg font-bold text-md w-full h-12"
        onClick={onAdd}
      >
        <span className="">
          إضافة (
          <span className="font-bold">
            {total} {currency}
          </span>
          )
        </span>
      </button>
    </div>
  );
}
