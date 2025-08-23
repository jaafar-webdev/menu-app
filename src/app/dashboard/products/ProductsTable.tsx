
import { Product } from "@/types";
import Image from "next/image";

interface ProductWithCategory extends Product {
   categoryName: string;
}

interface ProductsTableProps {
   products: ProductWithCategory[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-right">الصورة</th>
            <th className="py-3 px-6 text-right">الاسم</th>
            <th className="py-3 px-6 text-center hidden md:table-cell">الصنف</th>
            <th className="py-3 px-6 text-center">السعر</th>
            <th className="py-3 px-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {products.map((product: ProductWithCategory) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <Image
                  src={product.image_url || "/placeholder.png"}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                  unoptimized
                />
              </td>
              <td className="py-3 px-6 text-right">
                <div className="flex flex-col">
                  <span className="font-semibold">{product.name}</span>
                  <span className="text-xs text-gray-500 md:hidden">{product.categoryName}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center hidden md:table-cell">
                <span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs">
                  {product.categoryName}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                {product.price !== null ? (
                  <span className="font-semibold">{product.price} جنيه</span>
                ) : (
                  <span className="text-gray-400">متعدد الأسعار</span>
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
