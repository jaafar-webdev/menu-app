"use server";

import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface ProductResponse {
   success: boolean;
   message: string;
}

export async function updateProduct(
   id: string,
   categoryId: string,
   prevState: ProductResponse,
   formData: FormData
): Promise<ProductResponse> {
   const name = formData.get("name") as string;
   const price = formData.get("price") as string;
   const description = formData.get("description") as string;
   const image = formData.get("image") as File;
   const oldImage = formData.get("oldImage") as string;

   function extractPublicId(url: string): string | null {
      try {
         const parsedUrl = new URL(url);
         const path = parsedUrl.pathname;
         const parts = path.split("/upload/");
         if (parts.length < 2) return null;
         return parts[1].replace(/^v\d+\//, "").replace(/\.\w+$/, "");
      } catch {
         return null;
      }
   }

   try {
      let imageUrl = oldImage;

      if (image && image.size > 0) {
         // Delete old image from Cloudinary
         if (oldImage) {
            const publicId = extractPublicId(oldImage);
            if (publicId) {
               const result = await cloudinary.uploader.destroy(publicId);
               console.log("Delete result:", result); // للتحقق
            }
         }

         // Upload new image to Cloudinary
         const arrayBuffer = await image.arrayBuffer();
         const buffer = new Uint8Array(arrayBuffer);
         const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
               .upload_stream({}, (error, result) => {
                  if (error) {
                     reject(error);
                     return;
                  }
                  resolve(result);
               })
               .end(buffer);
         });

         // @ts-ignore
         if (!uploadResult?.secure_url) {
            return {
               success: false,
               message: "فشل رفع الصورة، حاول مرة أخرى",
            };
         }

         // @ts-ignore
         imageUrl = uploadResult.secure_url;
      }

      const productRef = doc(db, "categories", categoryId, "products", id);
      await updateDoc(productRef, {
         name,
         price: parseFloat(price),
         description,
         categoryId,
         imageUrl,
      });

      revalidatePath("/dashboard/products");
      return { success: true, message: "تم تحديث المنتج بنجاح" };
   } catch (error: any) {
      console.error("Error updating product: ", error);
      return {
         success: false,
         message: error.message || "حدث خطأ أثناء تحديث المنتج",
      };
   }
}
