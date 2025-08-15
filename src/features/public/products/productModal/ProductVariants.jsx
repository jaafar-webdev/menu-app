export default function ProductVariants({
  variants,
  selectedVariant,
  onSelectVariant,
  currency,
}) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <fieldset className="p-4 border-t">
      <legend className="text-lg font-semibold mb-2">الخيارات</legend>
      <div className="space-y-2">
        {variants.map((variant) => (
          <label
            key={variant.id}
            htmlFor={variant.id}
            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary"
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={variant.id}
                name="variant"
                value={variant.id}
                checked={selectedVariant?.id === variant.id}
                onChange={() => onSelectVariant(variant)}
                className="sr-only peer"
              />
              <div className="relative w-5 h-5 flex-shrink-0 border-2 border-gray-300 bg-white rounded-sm peer-checked:bg-primary peer-checked:border-primary"></div>
              <span className="mr-3 text-md font-medium text-gray-900">
                {variant.name}
              </span>
            </div>
            <span className="text-md font-semibold text-gray-800">
              {variant.price} {currency}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
