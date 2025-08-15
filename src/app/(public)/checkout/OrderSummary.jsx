const OrderSummary = ({ items, deliveryFee = 0 }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const total = subtotal + deliveryFee;

  return (
    <div className="border border-gray-200 rounded-md p-4 space-y-2">
      <h2 className="text-lg font-semibold">ملخص الفاتورة</h2>
      <div className="flex justify-between">
        <span>سعر المنتجات</span>
        <span>{subtotal.toFixed(2)} جنيه</span>
      </div>
      <div className="flex justify-between">
        <span>رسوم التوصيل</span>
        <span>{deliveryFee.toFixed(2)} جنيه</span>
      </div>
      <hr />
      <div className="flex justify-between font-bold text-lg">
        <span>الإجمالي</span>
        <span>{total.toFixed(2)} جنيه</span>
      </div>
    </div>
  );
};

export default OrderSummary;
