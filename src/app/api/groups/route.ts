// app/api/groups/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
   try {
      // جلب الكاتيجوريز
      const categoriesSnapshot = await getDocs(collection(db, "categories"));

      // تحويل البيانات لفورمات بسيط
      const groups = await Promise.all(
         categoriesSnapshot.docs.map(async (categoryDoc) => {
            const categoryData = categoryDoc.data();

            // جلب البرودكتس للكاتيجوري دي
            const productsSnapshot = await getDocs(
               collection(db, "categories", categoryDoc.id, "products")
            );

            const products = productsSnapshot.docs.map((productDoc) => ({
               id: productDoc.id,
               name: productDoc.data().name,
               description: productDoc.data().description,
               imageUrl: productDoc.data().imageUrl,
               price: productDoc.data().price,
               createdAt: productDoc.data().createdAt,
            }));

            return {
               id: categoryDoc.id,
               name: categoryData.name,
               imageUrl: categoryData.imageUrl || null,
               createdAt: categoryData.createdAt,
               products: products,
            };
         })
      );

      return NextResponse.json(groups);
   } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
      return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
   }
}
