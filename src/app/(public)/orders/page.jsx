"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const OrdersPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">طلباتي</h2>

        <div className="space-y-4">
          {/* Placeholder for when there are no orders */}
          <div className="p-8 text-center bg-gray-100 rounded-md">
            <p className="text-lg text-gray-600">لا توجد طلبات سابقة</p>
            <p className="mt-2 text-sm text-gray-500">
              عندما تقوم بإجراء طلبات، ستظهر هنا
            </p>
          </div>

          {/* This section would be replaced with actual orders data */}
          <div className="mt-6 text-center">
            <Link
              href="/menu"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              تصفح القائمة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
