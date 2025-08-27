import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import CategoriesTable from "./CategoriesTable";
import { Group } from "@/types";

async function getCategories(): Promise<Group[]> {
   const categoriesCol = collection(db, "categories");
   const categorySnapshot = await getDocs(categoriesCol);
   const categoryList = categorySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Group, "id">),
   }));
   return categoryList;
}

export default async function CategoriesPage() {
   const categories = await getCategories();

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6 text-center">قائمة الفئات</h1>
         <CategoriesTable categories={categories} />
      </div>
   );
}
