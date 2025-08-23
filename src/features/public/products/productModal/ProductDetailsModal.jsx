"use client";

import { useState, useEffect } from "react";
import ProductModalOverlay from "./ProductModalOverlay";
import ProductImageWithClose from "./ProductImageWithClose";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import useCartStore from "@/store/cartStore";
import ProductVariants from "./ProductVariants";

export default function ProductDetailsModal({ product, open, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!open || !product) return null;

  const hasVariants = product.variants && product.variants.length > 0;

  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
  };

  const price = selectedVariant ? selectedVariant.price : +product.price || 0;
  const total = (price * quantity).toFixed(2);

  return (
    <>
      <ProductModalOverlay />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 transform "
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto relative flex flex-col md:max-h-[90vh] overflow-y-auto md:w-[500px] h-full md:h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <ProductImageWithClose
            imageUrl={product.imageUrl}
            name={product.name}
            onClose={onClose}
          />
          <ProductDetails
            name={product.name}
            price={price}
            currency={product.currency}
            description={product.description}
            notes={notes}
            setNotes={setNotes}
            hasVariants={hasVariants}
          />
          <ProductVariants
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={handleSelectVariant}
            currency={product.currency}
          />
          <ProductActions
            quantity={quantity}
            setQuantity={setQuantity}
            total={total}
            currency={product.currency}
            onAdd={() => {
              const productToAdd = selectedVariant
                ? {
                    ...product,
                    ...selectedVariant,
                    price: selectedVariant.price,
                  }
                : product;
              addToCart(productToAdd, quantity, notes);
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}
