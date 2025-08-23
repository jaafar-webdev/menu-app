import { Product, Group } from "@/types";
import ProductsTable from "./ProductsTable";

async function getProducts() {
   // In a real app, the URL should be in an environment variable.
   // Using a relative path works for server components.
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`, {
      next: { revalidate: 60 },
   });

   if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to fetch data");
   }

   const groups = await res.json();

   if (!Array.isArray(groups)) {
      console.error("Fetched data is not an array:", groups);
      return [];
   }

   const productsWithCategory = groups.flatMap((group: Group) =>
      (group.products || []).map((product: Product) => ({
         ...product,
         image_url: product.imageUrl, // map imageUrl to image_url
         categoryName: group.name,
      }))
   );

   return productsWithCategory;
}

export default async function ProductsPage() {
   const products = await getProducts();

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6 text-center">قائمة المنتجات</h1>
         <ProductsTable products={products} />
      </div>
   );
}
