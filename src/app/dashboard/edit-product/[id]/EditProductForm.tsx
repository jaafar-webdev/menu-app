"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import UploadImage from "@/components/ui/UploadImage";
import { ProductResponse, updateProduct } from "./actions";
import { getCategories } from "@/app/dashboard/add-product/actions";

interface Category {
   id: string;
   name: string;
}

interface Product {
   id: string;
   name: string;
   price: number;
   description: string;
   imageUrl: string;
   categoryId: string;
}

const initialState: ProductResponse = {
   message: "",
   success: false,
};

function SubmitButton() {
   const { pending } = useFormStatus();

   return (
      <Button
         type="submit"
         className="w-full"
         aria-disabled={pending}
         variant="primary"
         size="default"
      >
         {pending ? "جاري التحديث..." : "تحديث المنتج"}
      </Button>
   );
}

export default function EditProductForm({
   product,
   categoryId,
}: {
   product: Product;
   categoryId: string;
}) {
   const updateProductWithIdAndCategory = updateProduct.bind(
      null,
      product.id,
      categoryId
   );
   const [state, formAction] = useFormState(
      updateProductWithIdAndCategory,
      initialState
   );
   const [categories, setCategories] = useState<Category[]>([]);

   useEffect(() => {
      async function fetchCategories() {
         const fetchedCategories = await getCategories();
         setCategories(fetchedCategories as Category[]);
      }
      fetchCategories();
   }, []);

   return (
      <form action={formAction} className="space-y-6">
         <input type="hidden" name="id" value={product.id} />
         <input type="hidden" name="oldImage" value={product.imageUrl} />
         <div>
            <label
               htmlFor="name"
               className="block text-sm font-medium text-gray-700"
            >
               اسم المنتج
            </label>
            <Input
               type="text"
               id="name"
               name="name"
               defaultValue={product.name}
               className="mt-1"
               placeholder="مثال: بيتزا مارجريتا"
               required
            />
         </div>

         <div>
            <label
               htmlFor="description"
               className="block text-sm font-medium text-gray-700"
            >
               الوصف
            </label>
            <textarea
               id="description"
               name="description"
               defaultValue={product.description}
               rows={3}
               className="block w-full px-3 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               placeholder="وصف المنتج..."
               required
            ></textarea>
         </div>

         <div>
            <label
               htmlFor="categoryId"
               className="block text-sm font-medium text-gray-700"
            >
               الفئة
            </label>
            <select
               id="categoryId"
               name="categoryId"
               defaultValue={product.categoryId}
               className="block w-full px-3 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               required
            >
               <option value="">اختر فئة</option>
               {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                     {category.name}
                  </option>
               ))}
            </select>
         </div>

         <div>
            <label
               htmlFor="price"
               className="block text-sm font-medium text-gray-700"
            >
               السعر
            </label>
            <Input
               type="number"
               id="price"
               name="price"
               defaultValue={product.price}
               placeholder="مثال: 50.00"
               required
               step="0.01"
               className="mt-1"
            />
         </div>

         <div>
            <UploadImage name="image" />
         </div>

         <SubmitButton />

         {state?.message && (
            <p
               className={`mt-2 text-sm ${
                  state.success ? "text-green-600" : "text-red-600"
               }`}
               aria-live="polite"
            >
               {state.message}
            </p>
         )}
      </form>
   );
}
