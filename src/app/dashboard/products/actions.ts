"use server";

import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

interface ActionResult {
   success: boolean;
   message: string;
}

export async function deleteProduct(
   categoryId: string,
   productId: string
): Promise<ActionResult> {
   try {
      const productDocRef = doc(
         db,
         "categories",
         categoryId,
         "products",
         productId
      );
      await deleteDoc(productDocRef);
      revalidatePath("/dashboard/products");
      return { success: true, message: "Product deleted successfully." };
   } catch (error) {
      console.error("Error deleting product: ", error);
      return { success: false, message: "Failed to delete product." };
   }
}

