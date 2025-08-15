"use client";
import { useState } from "react";
import BranchSelector from "./BranchSelector";
import IconButton from "./IconButton";
import ClientSidebar from "./sidebar/Sidebar";
import CartIcon from "./icons/CartIcon";
import MenuIcon from "./icons/MenuIcon";
import useCartStore from "@/store/cartStore";
const TopBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full bg-[#272727] py-2.5 px-0 z-50 ">
        <nav className="flex flex-row-reverse items-center justify-between gap-2.5 w-full max-w-[90%] mx-auto px-4">
          <IconButton className="w-10 relative">
            <CartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -left-1 -top-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold border-1 border-white">
                {cartCount}
              </span>
            )}
          </IconButton>
          <BranchSelector />

          <IconButton className="w-10" onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="h-6 w-6" />
          </IconButton>
        </nav>
      </div>

      <ClientSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default TopBar;
