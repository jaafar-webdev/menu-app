import Link from "next/link";

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div>
         <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between">
               <div className="flex space-x-4">
                  <Link
                     href="/dashboard/products"
                     className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                     المنتجات
                  </Link>
                  <Link
                     href="/dashboard/category"
                     className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                     الفئات
                  </Link>
                  <Link
                     href="/dashboard/add-product"
                     className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                     إضافة منتج
                  </Link>
                  <Link
                     href="/dashboard/add-category"
                     className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                     إضافة صنف
                  </Link>
               </div>
            </div>
         </nav>
         <main className="p-4">{children}</main>
      </div>
   );
}
