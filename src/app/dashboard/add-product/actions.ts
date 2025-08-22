"use server";

import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface ProductFormData {
   name: string;
   description: string;
   price: number;
   categoryId: string;
   image: File | null;
}

export interface ProductResponse {
   message: string;
   success?: boolean;
   imageUrl?: string;
}

export async function getCategories() {
   try {
      const categoriesCol = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCol);
      const categoryList = categorySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));
      return categoryList;
   } catch (error) {
      console.error("Error fetching categories: ", error);
      return [];
   }
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

export async function addProduct(
   prevState: ProductResponse,
   formData: FormData
): Promise<ProductResponse> {
   const name = formData.get("name")?.toString() || null;
   const description = formData.get("description")?.toString() || null;
   const price = parseFloat(formData.get("price")?.toString() || "0");
   const categoryId = formData.get("categoryId")?.toString() || null;
   const image = formData.get("image") as File | null;

   if (!name || !description || !price || !categoryId) {
      return {
         message: "يرجى ملء جميع الحقول المطلوبة.",
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
      const productData = {
         name,
         description,
         price,
         imageUrl,
         createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "categories", categoryId, "products"), productData);

   } catch (e) {
      console.error("Error adding document: ", e);
      return {
         message: "فشل في حفظ المنتج في قاعدة البيانات.",
         success: false,
      };
   }

   revalidatePath("/menu");

   return {
      message: "تم إنشاء المنتج بنجاح!",
      success: true,
      imageUrl,
   };
}