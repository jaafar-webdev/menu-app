import CartIcon from "../header/icons/CartIcon";

export default function EmptyCart() {
  return (
    <p className="text-gray-500 text-lg flex flex-col items-center justify-center gap-2 py-10">
      <CartIcon className="w-12 h-12" />
      اضف منتجات الي السلة
    </p>
  );
}
