"use client";

import { CategoryForm } from "./CategoryForm";

export default function AddCategoryPage() {
  return (
    <main>
      <div>
        <p className="font-medium text-2xl">اضف فئة جديدة</p>
      </div>
      <div>
        <CategoryForm />
      </div>
    </main>
  );
}
