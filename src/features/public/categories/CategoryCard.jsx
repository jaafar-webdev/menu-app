// CategoryCard.js أو CategoryTab.js
"use client";

import Image from "next/image";

export default function CategoryTab({ name, imageUrl, targetId, isActive }) {
  const scrollToSection = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // تحسين التعامل مع الصور
  const isValidSrc =
    imageUrl && typeof imageUrl === "string" && imageUrl.trim() !== "";

  return (
    <div className="min-w-[130px] w-[130px] flex-shrink-0 bg-gray-100 rounded-xl">
      <button
        type="button"
        onClick={scrollToSection}
        title={name}
        className={`w-full flex flex-col text-center rounded-lg overflow-hidden p-1 
                       transition-all duration-200 transform focus:outline-none 
                       hover:bg-gray-50 group font-normal
                       ${
                         isActive
                           ? "bg-primary text-white"
                           : "bg-gray-100 text-gray-700 group-hover:text-black"
                       }`}
      >
        <div className="imgthumb w-full h-[90px] overflow-hidden rounded-lg mb-1 bg-gray-200 flex items-center justify-center">
          {isValidSrc ? (
            <Image
              src={imageUrl}
              alt={name || "صورة الفئة"}
              width={130}
              height={90}
              sizes="130px"
              className="w-full h-full object-cover"
              priority={false}
              unoptimized
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add("bg-gray-200");
                e.target.parentElement.innerHTML =
                  '<span class="text-gray-400 text-xs">لا صورة</span>';
              }}
            />
          ) : (
            <span className="text-gray-400 text-xs">لا صورة</span>
          )}
        </div>

        <span className="text-sm min-h-[35px] leading-tight flex items-center justify-center">
          {name}
        </span>
      </button>
    </div>
  );
}
