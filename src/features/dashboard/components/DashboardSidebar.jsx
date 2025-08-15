"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "إضافة منتجات", href: "/dashboard/addproduct" },
  { name: "إضافة فئة", href: "/dashboard/addcategory" },
  { name: "عرض الفئات", href: "/dashboard/categories" },
  { name: "عرض المنتجات", href: "/dashboard/products" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-55 bg-white shadow-md p-5">
      <div className="p-2">
        <h2 className="text-xl font-bold">لوحة التحكم</h2>
      </div>
      <nav>
        <ul className="mt-4 ">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <p
                  className={`block p-2 my-3 hover:bg-indigo-800 hover:text-white ${
                    pathname === link.href ? "bg-indigo-800 text-white" : ""
                  } rounded-md`}
                >
                  {link.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
