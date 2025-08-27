"use server";

import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function deleteCategory(categoryId: string) {
   try {
      const categoryDocRef = doc(db, "categories", categoryId);
      await deleteDoc(categoryDocRef);
      console.log(`Category with ID ${categoryId} deleted successfully.`);
      revalidatePath("/dashboard/category");
      revalidatePath("/menu");
      return { success: true, message: "Category deleted successfully." };
   } catch (error) {
      console.error("Error deleting category: ", error);
      return { success: false, message: "Failed to delete category." };
   }
}
