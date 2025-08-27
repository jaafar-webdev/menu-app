"use client";

import { useActiveCategory } from "./useActiveCategory";
import CategoryCard from "./CategoryCard";

export default function Categories({ groups }) {
  const activeId = useActiveCategory(groups);

  return (
    <>
      {/* Mobile: Horizontal Scroll */}
      <div className="z-10 bg-white py-2 lg:hidden">
        <div className="overflow-hidden">
          <ul
            dir="rtl"
            className="flex gap-2.5 overflow-x-auto no-scrollbar px-2"
          >
            {groups.map((category) => (
              <li key={category.id} className="flex-shrink-0">
                <CategoryCard
                  name={category.name}
                  imageUrl={category.imageUrl}
                  targetId={`group-${category.id}`}
                  isActive={activeId === `group-${category.id}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop: Sticky Sidebar */}
      <aside className="hidden lg:block bg-white rounded-lg shadow border border-gray-300 h-[calc(100vh-5rem)] overflow-y-auto scrollbar-custom sticky top-[70px]">
        <nav className="flex flex-col gap-1 rounded-md transition-all duration-300 text-[14px]">
          {groups.length > 0 ? (
            groups.map((category) => {
              const isActive = activeId === `group-${category.id}`;
              return (
                <a
                  key={category.id}
                  href={`#group-${category.id}`}
                  className={`relative flex items-center py-3 pr-6 hover:bg-gray-200 font-normal transition-all duration-200 ${isActive ? "font-semibold text-gray-800" : ""}`}
                >
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 h-full w-1 bg-red-500 rounded-r-full transition-all duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}
                  />
                  {category.name}
                </a>
              );
            })
          ) : (
            <div className="py-3 pr-1.5 text-gray-500">لا توجد فئات</div>
          )}
        </nav>
      </aside>
    </>
  );
}
