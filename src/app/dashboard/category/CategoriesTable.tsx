"use client";
import { Group } from "@/types";
import { deleteCategory } from "./actions";
import Image from "next/image";

interface CategoriesTableProps {
   categories: Group[];
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
   const handleDelete = async (categoryId: string) => {
      const result = await deleteCategory(categoryId);
      if (!result.success) {
         alert(result.message);
      }
   };

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
               <tr>
                  <th className="py-3 px-6 text-right">الاسم</th>
                  <th className="py-3 px-6 text-right">الصورة</th>
                  <th className="py-3 px-6 text-center">الإجراءات</th>
               </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
               {categories.map((category: Group) => (
                  <tr
                     key={category.id}
                     className="border-b border-gray-200 hover:bg-gray-100"
                  >
                     <td className="py-3 px-6 text-right">
                        <span className="font-semibold">{category.name}</span>
                     </td>
                     <td>
                        <div className="m-2">
                           <Image
                              src={category.imageUrl!}
                              alt=""
                              width={100}
                              height={100}
                           />
                        </div>
                     </td>
                     <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center gap-2">
                           <button className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center mr-2 hover:bg-blue-600">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
                                 />
                              </svg>
                           </button>
                           <button
                              className="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                              onClick={() => handleDelete(category.id!)}
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                 />
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

export default CategoriesTable;
