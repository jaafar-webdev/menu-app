export default function ProductDetails({
  name,
  price,
  currency,
  description,
  notes,
  setNotes,
  hasVariants,
}) {
  return (
    <div className="flex flex-col gap-2 p-4 flex-grow">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg font-bold">{name}</span>
        <span className="text-base font-semibold">
          {price > 0
            ? `${price.toFixed(2)} EGP`
            : hasVariants
              ? "السعر عند الإختيار"
              : ""}
        </span>
      </div>
      <div className="text-gray-600 text-xs mb-2">{description}</div>
      <div> ملاحظات</div>
      <textarea
        className="w-full  rounded-md p-2 text-sm min-h-[60px] resize-none  outline-none"
        placeholder="اكتب ملاحظاتك"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}
