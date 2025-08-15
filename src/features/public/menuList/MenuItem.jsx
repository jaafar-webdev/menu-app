"use client";
import Image from "next/image";
import { useState } from "react";
import { truncateWithDots } from "../utils/truncateWithDots";
import ProductDetailsModal from "../products/productModal/ProductDetailsModal";

export default function MenuItem({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const hasVariants = product.variants && product.variants.length > 0;
  const price = (+product.price).toFixed(2);
  const currency = product.currency;

  return (
    <>
      <div
        className="item flex justify-between gap-2 p-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-pointer duration-300 my-3 grow hover:scale-[1.01] mx-2"
        onClick={() => setModalOpen(true)}
      >
        <div className="txt flex flex-col justify-between flex-grow gap-2 min-h-full">
          <div className="topRow flex flex-col gap-1">
            <div className="productName text-base font-bold min-h-[24px]">
              {product.name}
            </div>
            <div className="productDesc text-xs text-gray-600 min-h-[32px]">
              {truncateWithDots(product.description, 60)}
            </div>
          </div>

          <div className="bottomRow flex items-center justify-between flex-shrink-0">
            {hasVariants ? (
              <div className="priceOnSelection px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-full inline-flex items-center gap-1 min-h-[24px]">
                السعر حسب الاختيار
              </div>
            ) : (
              <div className="priceOnSelection px-2 py-1 text-sm text-gray-700 bg-gray-100 rounded-full inline-flex items-center gap-1 min-h-[24px]">
                {price} {currency}
              </div>
            )}
          </div>
        </div>

        <div className="imgthumb flex-shrink-0 overflow-hidden relative w-[100px] h-[100px] md:w-24 md:h-24 rounded-md lg:w-[120px] lg:h-[120px] bg-gray-100">
          <Image
            src={product.image_url?.trim()}
            alt={product.name}
            width={120}
            height={120}
            sizes="(max-width: 768px) 100px, (max-width: 1024px) 96px, 120px"
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      </div>
      <ProductDetailsModal
        product={product}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
