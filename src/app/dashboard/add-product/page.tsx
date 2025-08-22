import { AddProductForm } from "./AddProductForm";

export default function AddProductPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          إنشاء منتج جديد
        </h1>
        <AddProductForm />
      </div>
    </div>
  );
}