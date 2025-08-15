import Image from "next/image";

export default function ProductImageWithClose({ imageUrl, name, onClose }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative pt-[60%] md:pt-[60%] lg:pt-[60%] rounded-t-lg md:rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={imageUrl?.trim() || "/images/placeholder.jpg"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 500px"
          className="object-cover"
          priority={false}
          unoptimized
        />
      </div>

      {/* زر الإغلاق */}
      <button
        onClick={onClose}
        className="absolute top-2 left-2 bg-white rounded-md p-1 shadow hover:bg-gray-100 w-10 h-10 flex items-center justify-center z-10"
        aria-label="إغلاق"
      >
        <span className="text-2xl">&times;</span>
      </button>
    </div>
  );
}
