"use client";

import { useEffect } from "react";

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
         <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ ما!</h2>
         <p className="text-gray-700 mb-6">
            {error.message || "عذرًا، حدث خطأ غير متوقع."}
         </p>
         <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
         >
            إعادة المحاولة
         </button>
      </div>
   );
}
