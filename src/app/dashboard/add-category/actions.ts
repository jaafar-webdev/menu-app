// app/admin/categories/AddCategoryForm/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CategoryFormData {
   categoryName: string | null;
   image: File | null;
}

export interface CategoryResponse {
   message: string;
   success?: boolean;
   imageUrl?: string;
}

async function uploadImage(file: File): Promise<string> {
   const bytes = await file.arrayBuffer();
   const buffer = Buffer.from(bytes);

   // إنشاء اسم ملف مؤقت
   const filePath = join(tmpdir(), file.name);

   // حفظ الملف مؤقتًا
   await fs.writeFile(filePath, buffer);

   try {
      const result = await cloudinary.uploader.upload(filePath, {
         upload_preset: "Puplic_preset",
         folder: "product",
      });

      return result.secure_url;
   } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error("فشل في رفع الصورة إلى Cloudinary");
   } finally {
      await fs.unlink(filePath);
   }
}

export async function addCategory(
   prevState: CategoryResponse,
   formData: FormData
): Promise<CategoryResponse> {
   const categoryName = formData.get("categoryName")?.toString() || null;
   const image = formData.get("image") as File | null;

   if (!categoryName) {
      return {
         message: "يرجى إدخال اسم الفئة.",
         success: false,
      };
   }

   if (!image || !(image instanceof File) || image.size === 0) {
      return {
         message: "يرجى رفع صورة صالحة.",
         success: false,
      };
   }

   let imageUrl = "";
   try {
      imageUrl = await uploadImage(image);
   } catch (error) {
      const errorMsg =
         error instanceof Error ? error.message : "فشل غير معروف في رفع الصورة";
      return {
         message: `فشل في رفع الصورة: ${errorMsg}`,
         success: false,
      };
   }

   try {
      await addDoc(collection(db, "categories"), {
         name: categoryName,
         imageUrl: imageUrl,
         createdAt: new Date().toISOString(),
      });
   } catch (e) {
      console.error("Error adding document: ", e);
      return {
         message: "فشل في حفظ الفئة في قاعدة البيانات.",
         success: false,
      };
   }

   revalidatePath("/dashboard");
   revalidatePath("/admin/categories");

   return {
      message: "تم إنشاء الفئة بنجاح!",
      success: true,
      imageUrl,
   };
}
