import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import EditProductForm from "./EditProductForm";
import { Product } from "@/types";

async function getProduct(
   categoryId: string | undefined,
   productId: string
): Promise<Product | null> {
   if (!categoryId || !productId) return null;

   const docRef = doc(db, "categories", categoryId, "products", productId);
   const docSnap = await getDoc(docRef);
   return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as Product)
      : null;
}

// ✅ تم التصحيح: params و searchParams من نوع Promise
export default async function EditProductPage({
   params,
   searchParams,
}: {
   params: Promise<{ id: string }>;
   searchParams: Promise<{ categoryId?: string | string[] }>;
}) {
   // ✅ await على params و searchParams
   const { id } = await params;
   const { categoryId: categoryIdParam } = await searchParams;

   // معالجة الحالة التي قد تكون فيها categoryId مصفوفة
   const categoryId = Array.isArray(categoryIdParam)
      ? categoryIdParam[0]
      : categoryIdParam || undefined;

   const product = await getProduct(categoryId, id);

   if (!product || !categoryId) {
      return <div>المنتج غير موجود أو الرابط غير صحيح</div>;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6 text-center">تعديل المنتج</h1>
         <EditProductForm product={product} categoryId={categoryId} />
      </div>
   );
}
