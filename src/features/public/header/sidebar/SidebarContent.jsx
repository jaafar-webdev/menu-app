"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/components/LogoutButton";

const PUBLIC_NAV_ITEMS = [
  { name: "الرئيسية", href: "/menu" },
  { name: "الفروع", href: "/branches" },
  { name: "الرمز الترويجي", href: "/promo-code" },
];

const AUTH_NAV_ITEMS = [
  { name: "الملف الشخصي", href: "/profile" },
  { name: "طلباتي", href: "/orders" },
];

const NavLink = ({ href, children, onClose }) => (
  <li>
    <Link
      href={href}
      className="block border-b border-gray-100 py-3 text-gray-700 transition-colors hover:text-gray-900"
      onClick={onClose}
    >
      {children}
    </Link>
  </li>
);

export default function SidebarContent({ onClose }) {
  const { user, loading } = useAuth();

  return (
    <nav className="flex-grow overflow-y-auto px-3 pb-4">
      <ul className="space-y-1">
        {/* Always show public navigation items */}
        {PUBLIC_NAV_ITEMS.map((item) => (
          <NavLink key={item.name} href={item.href} onClose={onClose}>
            {item.name}
          </NavLink>
        ))}

        {/* Show auth items only if user is logged in */}
        {!loading && user ? (
          <>
            {AUTH_NAV_ITEMS.map((item) => (
              <NavLink key={item.name} href={item.href} onClose={onClose}>
                {item.name}
              </NavLink>
            ))}
            <li className="mt-4">
              <LogoutButton className="w-full" />
            </li>
          </>
        ) : (
          <>
            <NavLink href="/login" onClose={onClose}>
              تسجيل الدخول
            </NavLink>
            <NavLink href="/register" onClose={onClose}>
              إنشاء حساب
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}
