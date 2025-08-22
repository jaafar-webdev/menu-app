"use client";

import { useFormState, useFormStatus } from "react-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import UploadImage from "@/components/ui/UploadImage";
import { addCategory, CategoryResponse } from "./actions";

const initialState: CategoryResponse = {
   message: "",
};

const SubmitButton = () => {
   const { pending } = useFormStatus();

   return (
      <Button
         variant="primary"
         size="default"
         type="submit"
         className="w-full"
         aria-disabled={pending}
      >
         {pending ? "جاري الإنشاء..." : "إنشاء الفئة"}
      </Button>
   );
};

const AddCategoryForm = () => {
   const [state, formAction] = useFormState(addCategory, initialState);

   return (
      <form action={formAction} className="space-y-6">
         {/* حقل اسم الفئة */}
         <div>
            <label
               htmlFor="categoryName"
               className="block text-sm font-medium text-gray-700"
            >
               اسم الفئة
            </label>
            <Input
               type="text"
               id="categoryName"
               name="categoryName"
               className="mt-1"
               placeholder="مثال: بيتزا"
               required
            />
         </div>

         {/* رفع الصورة */}
         <div>
            <UploadImage
               name="image"
               aria-label="صورة الفئة"
               accept="image/*"
               required
            />
         </div>

         {/* زر الإرسال */}
         <SubmitButton />

         {/* رسالة النتيجة */}
         {state.message && (
            <p
               className={`mt-2 text-sm ${state.success ? "text-green-600" : "text-red-600"}`}
               aria-live="polite"
            >
               {state.message}
            </p>
         )}
      </form>
   );
};

export default AddCategoryForm;
