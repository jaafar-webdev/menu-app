import useCartStore from "@/store/cartStore";
import CartItem from "./CartItem";

export default function CartItemsList() {
  const { items, removeFromCart, updateQuantity } = useCartStore();

  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
}
