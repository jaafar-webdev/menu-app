"use client";
import useCartStore from "@/store/cartStore";
import Button from "@/components/Button";
import CartIcon from "../header/icons/CartIcon";
import NotificationIcon from "./icon/NotificationIcon";
import { useRouter, usePathname } from "next/navigation";

export default function CartMobileBar() {
  const { items, getSubtotal, getTotalItems } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();

  if (items.length === 0 || pathname === "/checkout") {
    return null;
  }

  return (
    <div
      className="fixed bottom-2 left-0 right-0 bg-primary  shadow-top p-2 flex flex-row-reverse justify-between items-center md:hidden mx-3 rounded-md cursor-pointer text-white"
      onClick={() => router.push("/checkout")}
      role="button"
    >
      {/* Cart Icon - Left */}
      {/* Total Price - Left */}
      <div className="font-bold text-lg">
        <span>{getSubtotal().toFixed(2)} EGP</span>
      </div>

      {/* Checkout Button - Center */}
      <div className=" text-white  py-2 px-6 font-medium">تنفيذ الطلب</div>

      {/* Cart Icon & Item Count - Right */}
      <div className="relative">
        <NotificationIcon />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </div>
    </div>
  );
}
