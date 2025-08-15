"use client";
import useCartStore from "@/store/cartStore";
import EmptyCart from "./EmptyCart";
import CartItemsList from "./CartItemsList";
import CartSummary from "./CartSummary";

export default function CartDesktop({ showSummary = true }) {
  const { items, getSubtotal } = useCartStore();

  const isEmpty = items.length === 0;

  return (
    <div className="p-3 border border-gray-300 shadow rounded-lg sticky top-[70px]">
      <aside>
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <CartItemsList />
            {showSummary && (
              <CartSummary total={getSubtotal()} isEmpty={isEmpty} />
            )}
          </>
        )}
      </aside>
    </div>
  );
}
